import {html} from "hono/html";
import {TodoProps} from "./prop-types";

const Todos = (props: TodoProps) => html`
    <ul class="todo-list">
        ${props.todos?.map(todo => html`
            <li>
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
                    <label>${todo.title}</label>
                    <form action="/todos/delete/${todo.id}" method="post"><button type="submit" class="destroy"></button></form>
                </div>
                <input class="edit" value="${todo.title}">
            </li>
        `)}
    </ul>
`

export default Todos