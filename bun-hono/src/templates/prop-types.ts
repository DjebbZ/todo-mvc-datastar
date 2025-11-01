import type { TodoType } from "../logic/types";

export interface TodoProps {
	todos: TodoType[];
	idToEdit?: TodoType["id"];
	filter?: "all" | "active" | "completed";
}

export type TodosProps = TodoProps & { toggled?: boolean };
