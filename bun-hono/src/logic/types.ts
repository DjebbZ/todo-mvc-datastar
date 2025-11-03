import { z } from "zod";
import { MAX_TODO_LENGTH, MIN_TODO_LENGTH } from "./constants.ts";

export interface SiteData {
	title: string;
	children?: unknown; // Hono doesn't export `HtmlEscapedString`
}

export const TodoCreateDto = z.object({
	title: z.string().min(MIN_TODO_LENGTH).max(MAX_TODO_LENGTH),
});

export const Todo = z.object({
	...TodoCreateDto.shape,
	id: z.uuidv7(),
	done: z.boolean(),
});

export type TodoType = z.infer<typeof Todo>;

const TodosFilter = z.enum(["all", "active", "completed"]).default("all");

export const TodosPageQuery = z.object({
	id: Todo.shape.id.optional(),
	filter: TodosFilter,
});

export type TodosFilterType = z.infer<typeof TodosFilter>;
