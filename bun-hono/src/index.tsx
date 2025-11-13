// noinspection SqlNoDataSourceInspection

import type { Database } from "bun:sqlite";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { renderToString } from "hono/jsx/dom/server";
import { jsxRenderer } from "hono/jsx-renderer";
import { logger } from "hono/logger";
import { streamSSE } from "hono/streaming";
import { ConnectedClients } from "./logic/connected-clients.tsx";
import { setupDatabase } from "./logic/db.ts";
import {
	addTodo,
	clearCompleted,
	deleteTodo,
	editTodo,
	getTodos,
	toggleAll,
	toggleTodo,
} from "./logic/todos_use-cases.ts";
import {
	type SiteData,
	Todo,
	TodoCreateDto,
	TodosPageQuery,
} from "./logic/types.ts";
import Layout from "./templates/Layout.tsx";
import Todos from "./templates/Todos.tsx";
import TodosPage from "./templates/TodosPage.tsx";

const db: Database = setupDatabase(":memory:");
const connectedClients = new ConnectedClients(db);

const app = new Hono();

app.use(logger());
app.use("/static/*", serveStatic({ root: "./src" }));
app.use(
	jsxRenderer(({ children }) => {
		const siteProps: SiteData = {
			title:
				"TodoStar: Realtime collaborative TodoMVC written in Datastar and Bun+Hono.",
		};
		return <Layout title={siteProps.title}>{children}</Layout>;
	}),
);

app.get("/", zValidator("query", TodosPageQuery), (c) => {
	const idToEdit = c.req.valid("query").id;
	const filter = c.req.valid("query").filter;

	const todos = getTodos(db, filter);

	return c.render(
		<TodosPage todos={todos} idToEdit={idToEdit} filter={filter} />,
	);
});

app.get("/ds/todos", (c) => {
	return streamSSE(
		c,
		async (stream) => {
			const clientId = connectedClients.add(stream);
			console.log(`Client ${clientId} connected`);

			stream.onAbort(function removeClient() {
				console.log(`Client ${clientId} disconnected`);
				connectedClients.remove(clientId);
			});

			// Keep the stream alive with periodic heartbeats
			// This allows the browser to signal disconnection via stream.abort()
			while (true) {
				await stream.writeSSE({
					event: "heartbeat",
					data: new Date().toISOString(),
				});
				await new Promise((resolve) => setTimeout(resolve, 30000)); // 30 second interval
			}
		},
		async (err, stream) => {
			console.error(`Error on stream for client ${stream}`, err);
			stream.abort();
		},
	);
});

app.post("/todos", zValidator("form", TodoCreateDto), (c) => {
	const { title } = c.req.valid("form");
	addTodo(db, title);
	const isDatastarRequest = c.req.header("datastar-request") === "true";

	if (isDatastarRequest) {
		connectedClients.broadcastTodos();
		return c.text("", 201);
	}
	return c.redirect("/");
});

// HTML supports only POST, so for DELETE/PUT/PATCH we use a POST
app.post(
	"/todos/:id/delete",
	zValidator("param", Todo.pick({ id: true })),
	(c) => {
		const id = c.req.valid("param").id;
		deleteTodo(db, id);
		return c.redirect("/");
	},
);

app.post(
	"/todos/:id/toggle",
	zValidator("param", Todo.pick({ id: true })),
	(c) => {
		const id = c.req.valid("param").id;
		toggleTodo(db, id);
		return c.redirect("/");
	},
);

app.post("todos/toggleAll", (c) => {
	toggleAll(db);
	return c.redirect("/");
});

app.post(
	"/todos/:id/edit",
	zValidator("param", Todo.pick({ id: true })),
	zValidator("form", Todo.pick({ title: true })),
	(c) => {
		const id = c.req.param("id");
		const { title } = c.req.valid("form");
		editTodo(db, id, title);
		return c.redirect("/");
	},
);

app.post("/todos/clear-completed", (c) => {
	clearCompleted(db);
	return c.redirect("/");
});

export default {
	fetch: app.fetch,
	idleTimeout: 0,
};
