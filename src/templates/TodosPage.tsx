import {html} from "hono/html";
import Todos from "./Todos";
import {TodosProps} from "./prop-types";

const TodosPage = (props: TodosProps) => html`
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <form action="/todos" method="post">
                <input name="title" 
                       required 
                       class="new-todo" 
                       placeholder="What needs to be done?" 
                       minlength="${MIN_TODO_LENGTH}" 
                       maxlength="${MAX_TODO_LENGTH}" 
                       ${!props.idToEdit && 'autofocus'}/>
                <input type="submit">
            </form>
        </header>
        <main class="main">
            <div class="toggle-all-container">
                <input class="toggle-all" id="toggle-all" type="checkbox"/>
                <label for="toggle-all" aria-label="Mark all as complete" title="Mark all as complete">Mark all as
                    complete</label>
            </div>
            ${<Todos todos={props.todos} idToEdit={props.idToEdit}/>}
        </main>
        <footer class="footer"></footer>
    </section>
`

import {MAX_TODO_LENGTH, MIN_TODO_LENGTH} from "../logic/constants";

export default TodosPage