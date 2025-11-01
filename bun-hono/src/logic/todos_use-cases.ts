import type { Database } from "bun:sqlite";
import { randomUUIDv7 } from "bun";
import type { TodoType } from "./types.ts";

export function addTodo(db: Database, title: string) {
	const id = randomUUIDv7();

	const query = db.query<never, { $title: typeof title; $id: typeof id }>(
		"INSERT INTO todos (id, title) VALUES ($id, $title)",
	);
	query.run({ $title: title, $id: id });
}

export function getTodos(db: Database): TodoType[] {
	const query = db.query<TodoType, []>("SELECT * FROM todos");
	return query.all();
}

export function deleteTodo(db: Database, id: string) {
	const query = db.query<never, { $id: typeof id }>(
		"DELETE FROM todos WHERE id = $id",
	);
	query.run({ $id: id });
}

export function toggleTodo(db: Database, id: string) {
	const query = db.query<never, { $id: typeof id }>(
		"UPDATE todos SET done = NOT done WHERE id = $id",
	);
	query.run({ $id: id });
}

export function toggleAll(db: Database, done: boolean) {
	const query = db.query<never, { $done: typeof done }>(
		"UPDATE todos SET done = $done",
	);
	query.run({ $done: done });
}

export function editTodo(db: Database, id: string, title: string) {
	const query = db.query<never, { $title: typeof title; $id: typeof id }>(
		"UPDATE todos SET title = $title WHERE id = $id",
	);
	query.run({ $title: title, $id: id });
}
