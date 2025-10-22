import {html} from "hono/html";
import {TodoProps} from "./prop-types";

const Todos = (props: TodoProps) => html`
    <ul class="todo-list">
        ${props.todos?.map(todo => html`
            <li>
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
                    <label>${todo.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${todo.title}">
            </li>
        `)}
    </ul>
`

export default Todos