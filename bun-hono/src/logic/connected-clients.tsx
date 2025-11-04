import type { Database } from "bun:sqlite";
import { randomUUIDv7 } from "bun";
import type { SSEStreamingApi } from "hono/streaming";
import Todos from "../templates/Todos.tsx";
import { getTodos } from "./todos_use-cases.ts";

export interface Client {
	id: string;
	stream: SSEStreamingApi;
}

export class ConnectedClients {
	private clients: Array<Client> = [];
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	public add(stream: SSEStreamingApi): Client["id"] {
		const id = randomUUIDv7();
		this.clients.push({ id, stream });
		return id;
	}

	public remove(clientId: Client["id"]) {
		this.clients = this.clients.filter((client) => client.id !== clientId);
	}

	public broadcastTodos() {
		const todos = getTodos(this.db);
		console.log({ nbClients: this.clients.length });
		this.clients.forEach(async (client) => {
			console.log({
				event: "datastar-patch-elements",
				data: `elements {<Todos todos=${todos}>}`,
			});
			await client.stream.writeSSE({
				event: "datastar-patch-elements",
				data: `elements ${<Todos todos={todos} />}`,
			});
		});
	}
}
