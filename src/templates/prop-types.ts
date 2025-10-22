import {type TodoType} from "../logic/types";

export interface TodoProps {
    todos: TodoType[]
    idToEdit?: Pick<TodoType, 'id'>
}