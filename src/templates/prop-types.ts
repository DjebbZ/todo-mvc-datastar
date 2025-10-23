import type { TodoType } from "../logic/types";

export interface TodoProps {
	todos: TodoType[];
	idToEdit?: TodoType["id"];
}

export type TodosProps = TodoProps & { toggled?: boolean };
