import { MAX_TODO_LENGTH, MIN_TODO_LENGTH } from "../logic/constants";
import type { TodosProps } from "./prop-types";
import Todos from "./Todos";

const TodosPage = (props: TodosProps) => {
	const todosLeft = props.todos.filter((t) => !t.done).length;
	const todosLeftText = todosLeft <= 1 ? "item" : "items";
	const atLeastOne = props.todos.length >= 1;
	const allDone = todosLeft === 0;
	const allDoneClasses = allDone ? "toggleAll all-done" : "toggleAll";

	return (
		<>
			<header data-init="@get('ds/todos')">
				<h1>todos</h1>
				<p data-text="$counter"></p>
			</header>
			<main>
				<section className="todo-main">
					{atLeastOne && (
						<form
							className="todo-input"
							action="/todos/toggleAll"
							method="post"
						>
							<button
								type="submit"
								className={allDoneClasses}
								title="Toggle all todos"
							>
								❯
							</button>
						</form>
					)}
					<form
						action="/todos"
						method="post"
						className="todo-input"
						data-on:submit="@post('/todos', {contentType: 'form'})"
					>
						<input
							type="text"
							name="title"
							placeholder="What needs to be done?"
							minlength={MIN_TODO_LENGTH}
							maxlength={MAX_TODO_LENGTH}
							required
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
						<a href="/" class={props.filter === "all" ? "selected" : ""}>
							All
						</a>
						<a
							href="/?filter=active"
							class={props.filter === "active" ? "selected" : ""}
						>
							Active
						</a>
						<a
							href="/?filter=completed"
							class={props.filter === "completed" ? "selected" : ""}
						>
							Completed
						</a>
					</div>
					<form action="/todos/clear-completed" method="post">
						<button type="submit">Clear completed</button>
					</form>
				</section>
			</main>
		</>
	);
};

export default TodosPage;
