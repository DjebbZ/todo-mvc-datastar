import {html} from "hono/html";
import {TodoProps} from "./prop-types";

export const Todos = (props: TodoProps)=> html`
    <ul class="todo-list">
        ${props.todos?.map(todo => html`
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                <label></label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.title}">
        `)}
    </ul>
    `