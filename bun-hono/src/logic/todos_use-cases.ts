import type { Database } from "bun:sqlite";
import { randomUUIDv7 } from "bun";
import type { TodosFilterType, TodoType } from "./types.ts";

export function addTodo(db: Database, title: string) {
	const id = randomUUIDv7();

	const query = db.query<never, { $title: typeof title; $id: typeof id }>(
		"INSERT INTO todos (id, title) VALUES ($id, $title)",
	);
	query.run({ $title: title, $id: id });
}

export function getTodos(db: Database, filter: TodosFilterType): TodoType[] {
	let sql = `SELECT * FROM todos`;
	switch (filter) {
		case "active":
			sql += " WHERE done = 0";
			break;
		case "completed":
			sql += " WHERE done = 1";
			break;
		default:
			break;
	}
	const query = db.query<TodoType, []>(sql);
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

export function toggleAll(db: Database) {
	const { allDone } = db
		.query(`
        SELECT NOT EXISTS (
            SELECT 1 FROM todos WHERE done = 0
        ) AS allDone;
    `)
		.get();
	const query = db.query("UPDATE todos SET done = $toggle");
	query.run({ $toggle: !allDone });
}

export function editTodo(db: Database, id: string, title: string) {
	const query = db.query<never, { $title: typeof title; $id: typeof id }>(
		"UPDATE todos SET title = $title WHERE id = $id",
	);
	query.run({ $title: title, $id: id });
}
