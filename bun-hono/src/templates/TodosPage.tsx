import { MAX_TODO_LENGTH, MIN_TODO_LENGTH } from "../logic/constants";
import type { TodosProps } from "./prop-types";
import Todos from "./Todos";

const TodosPage = (props: TodosProps) => {
	const todosLeft = props.todos.filter((t) => !t.done).length;
	const todosLeftText = todosLeft <= 1 ? "item" : "items";

	return (
		<>
			<header>
				<h1>todos</h1>
			</header>
			<main>
				<section className="todo-main">
					<form className="todo-input" action="/todos/toggleAll" method="post">
						<button type="submit" className="toggleAll">
							❯
						</button>
					</form>
					<form action="/todos" method="post" className="todo-input">
						<input
							type="text"
							name="title"
							placeholder="What needs to be done?"
							minlength={MIN_TODO_LENGTH}
							maxlength={MAX_TODO_LENGTH}
						/>
						<input type="submit" />
					</form>
				</section>
				{<Todos todos={props.todos} idToEdit={props.idToEdit} />}
				<section className="todo-actions-bar">
					<span class="count">
						{todosLeft} {todosLeftText} left!
					</span>
					<div class="filters">
						<a href="/" class="selected">
							All
						</a>
						<a href="/todos?filter=active">Active</a>
						<a href="/todos?filter=completed">Completed</a>
					</div>
					<form action="/todos/clear" method="post">
						<button type="submit">Clear completed</button>
					</form>
				</section>
			</main>
			<section className="todoapp">
				<header class="header">
					<h1>todos</h1>
					<form action="/todos" method="post">
						<input
							name="title"
							required
							class="new-todo"
							placeholder="What needs to be done?"
							minlength={MIN_TODO_LENGTH}
							maxlength={MAX_TODO_LENGTH}
							// biome-ignore lint/a11y/noAutofocus: the original todomvc app uses autofocus
							autoFocus={props.idToEdit === undefined}
						/>
						<input type="submit" />
					</form>
				</header>
				<main class="main">
					<div className="toggle-all-container">
						<input class="toggle-all" id="toggle-all" type="checkbox" />
						<label
							for="toggle-all"
							aria-label="Mark all as complete"
							title="Mark all as complete"
						>
							Mark all as complete
						</label>
					</div>
					{<Todos todos={props.todos} idToEdit={props.idToEdit} />}
				</main>
				<footer class="footer"></footer>
			</section>
		</>
	);
};

export default TodosPage;
