import {html} from "hono/html";
import {TodoProps} from "./prop-types";

const Todos = (props: TodoProps) => html`
    <ul class="todo-list">
        ${props.todos?.map(todo => html`
            <li>
                <div class="view">
                    <form action="/todos/${todo.id}/toggle" method="post" class="todo-state-form">
                        <input type="checkbox" id="toggle-${todo.id}" hidden aria-hidden="true" ${todo.done ? 'checked' : ''}>
                        <button type="submit" class="toggle-todo "></button>
                        <label for="toggle-${todo.id}">
                            ${todo.title}
                        </label>
                    </form>
                    
                    <form action="/todos/${todo.id}/delete" method="post"><button type="submit" class="destroy"></button></form>
                </div>
                <input class="edit" value="${todo.title}">
            </li>
        `)}
    </ul>
`

export default Todos