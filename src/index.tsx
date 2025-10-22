// noinspection SqlNoDataSourceInspection

import {Hono} from 'hono'
import Layout from "./templates/Layout";
import {serveStatic} from "hono/bun";
import {SiteData, Todo, TodoCreateDto, type TodoType} from "./logic/types";
import {logger} from "hono/logger";
import {Database} from "bun:sqlite"
import {randomUUIDv7} from "bun"
import TodosPage from "./templates/TodosPage";
import {zValidator} from "@hono/zod-validator";
import {addTodo, deleteTodo, getTodos} from "./logic/todos_use-cases";
import {setupDatabase} from "./logic/db";

const db = setupDatabase(":memory:")

const app = new Hono()

app.use(logger())
app.use('/static/*', serveStatic({root: './src'}))

app.get('/', (c) => {
    const todos = getTodos(db)

    const siteProps: SiteData = {
        title: "TodoStar: Realtime collaborative TodoMVC written in Datastar and Bun+Hono.",
    }

    return c.html(
        <Layout {...siteProps}>
            <TodosPage todos={todos}/>
        </Layout>
    )
})

app.post('/todos', zValidator('form', TodoCreateDto), (c) => {
    const {title} = c.req.valid("form");
    addTodo(db, title)
    return c.redirect("/")
})

// HTML doesn't support DELETE, so we use a POST to delete a todo
app.post('/todos/delete/:id', zValidator('param', Todo.pick({id: true})), (c) => {
    const id = c.req.valid('param').id
    deleteTodo(db, id)
    return c.redirect("/")
})

export default app
