import { z } from "zod";
import { MAX_TODO_LENGTH, MIN_TODO_LENGTH } from "./constants";

export interface SiteData {
	title: string;
	children?: unknown; // Hono doesn't export `HtmlEscapedString`
}

export const TodoCreateDto = z.object({
	title: z.string().min(MIN_TODO_LENGTH).max(MAX_TODO_LENGTH),
});

export type TodoCreateDtoType = z.infer<typeof TodoCreateDto>;

export const Todo = z.object({
	...TodoCreateDto.shape,
	id: z.uuidv7(),
	done: z.boolean(),
});

export type TodoType = z.infer<typeof Todo>;
