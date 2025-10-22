import {TodoCreateDtoType, TodoType} from "./types";
import {randomUUIDv7} from "bun";
import {Database} from "bun:sqlite";

export function addTodo(db: Database, title: TodoCreateDtoType) {
    const id = randomUUIDv7()

    const query =
        db.query("INSERT INTO todos (id, title) VALUES ($id, $title)")
    query.run({$title: title, $id: id})
}

export function getTodos(db: Database): TodoType[] {
    const query = db.query<TodoType>("SELECT * FROM todos")
    return query.all()
}

export function deleteTodo(db: Database, id: string) {
    const query = db.query("DELETE FROM todos WHERE id = $id")
    query.run({$id: id})
}