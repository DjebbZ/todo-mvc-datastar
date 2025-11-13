import { html } from "hono/html";
import type { TodoType } from "../logic/types.ts";
import type { TodoProps } from "./prop-types.ts";

const TodoView = ({ todo }: { todo: TodoType }) => html`
    <article class="todo-item">
        <form action="/todos/${todo.id}/toggle" method="post" class="todo-toggle">
            <input type="checkbox" id="toggle-${todo.id}" hidden name="completed" ${todo.done ? "checked" : ""} aria-hidden="true"/>
            <button type="submit"></button>
            <span>${todo.title}</span>
        </form>
        <a href="/?id=${todo.id}" class="todo-edit-link">✎</a>
        <form action="/todos/${todo.id}/delete" method="post" class="todo-delete">
            <button type="submit">ⓧ</button>
        </form>
    </article>
`;

const TodoEdit = ({ todo }: { todo: TodoType }) => html`
    <article class="todo-item">
        <form action="/todos/${todo.id}/edit" method="post" class="todo-edit">
            <input class="edit" name="title" value="${todo.title}"/>
            
        </form>
    </article>
`;

const Todos = (props: TodoProps) => html`
    <div id="todos">
        ${props.todos?.map(
					(todo) => html`
                ${
									todo.id === props.idToEdit ? (
										<TodoEdit todo={todo} />
									) : (
										<TodoView todo={todo} />
									)
								}
            `,
				)}
    </div>
`;

export default Todos;
