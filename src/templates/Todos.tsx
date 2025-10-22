import {html} from "hono/html";
import {TodoProps} from "./prop-types";
import {TodoType} from "../logic/types";

const TodoView = ({todo}: { todo: TodoType }) => html`
    <div class="view">
        <form action="/todos/${todo.id}/toggle" method="post" class="todo-state-form">
            <input type="checkbox" id="toggle-${todo.id}" hidden aria-hidden="true" ${todo.done ? 'checked' : ''}>
            <button type="submit" class="toggle-todo "></button>
            <label for="toggle-${todo.id}">
                ${todo.title}
            </label>
        </form>
        <div class="todo-actions">
            <a href="/?id=${todo.id}" class="edit-link">✎</a>
            <form action="/todos/${todo.id}/delete" method="post">
                <button type="submit" class="destroy"></button>
            </form>
        </div>
    </div>
`

const TodoEdit = ({todo}: {todo: TodoType}) => html`
    <form action="/todos/${todo.id}/edit" method="post">
        <input class="edit" name="title" value="${todo.title}" autofocus/>
    </form>
`

const Todos = (props: TodoProps) => html`
    <ul class="todo-list">
        ${props.todos?.map(todo => html`
            <li>
                ${todo.id === props.idToEdit ?
                        <TodoEdit todo={todo} /> :
                        <TodoView todo={todo} />}
            </li>
        `)}
    </ul>
`

export default Todos