// noinspection SqlNoDataSourceInspection

import type { Database } from "bun:sqlite";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import { logger } from "hono/logger";
import { setupDatabase } from "./logic/db.ts";
import {
	addTodo,
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
import TodosPage from "./templates/TodosPage.tsx";

const db: Database = setupDatabase(":memory:");

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

app.post("/todos", zValidator("form", TodoCreateDto), (c) => {
	const { title } = c.req.valid("form");
	addTodo(db, title);
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

app.post("todos/toggle", zValidator("form", Todo.pick({ done: true })), (c) => {
	const { done } = c.req.valid("form");
	toggleAll(db, done);
	const toggledURL = new URL("/");
	toggledURL.search = `done=${done}`;
	return c.redirect(toggledURL.toString());
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

export default app;
