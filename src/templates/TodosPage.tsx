import {html} from "hono/html";
import Todos from "./Todos";
import {TodoProps} from "./prop-types";

const TodosPage = (props: TodoProps) => html`
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus/>
        </header>
        <main class="main">
            <div class="toggle-all-container">
                <input class="toggle-all" id="toggle-all" type="checkbox"/>
                <label for="toggle-all" aria-label="Mark all as complete" title="Mark all as complete">Mark all as
                    complete</label>
            </div>
            ${<Todos todos={props.todos}/>}
        </main>
        <footer class="footer"></footer>
    </section>
`

export default TodosPage