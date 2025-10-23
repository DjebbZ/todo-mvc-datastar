// noinspection SqlNoDataSourceInspection

import {Hono} from 'hono'
import Layout from "./templates/Layout";
import {serveStatic} from "hono/bun";
import {SiteData, Todo, TodoCreateDto, type TodoType} from "./logic/types";
import {logger} from "hono/logger";
import {Database} from "bun:sqlite"
import TodosPage from "./templates/TodosPage";
import {zValidator} from "@hono/zod-validator";
import {addTodo, deleteTodo, getTodos, toggleTodo, editTodo, toggleAll} from "./logic/todos_use-cases";
import {setupDatabase} from "./logic/db";

const db: Database = setupDatabase(":memory:")

const app = new Hono()

app.use(logger())
app.use('/static/*', serveStatic({root: './src'}))

app.get('/', zValidator('query', Todo.partial().pick({id: true})), (c) => {
    const todos = getTodos(db)

    const siteProps: SiteData = {
        title: "TodoStar: Realtime collaborative TodoMVC written in Datastar and Bun+Hono.",
    }

    const idToEdit = c.req.valid('query').id

    console.log(idToEdit)

    return c.html(
        <Layout {...siteProps}>
            <TodosPage todos={todos} idToEdit={idToEdit}/>
        </Layout>
    )
})

app.post('/todos', zValidator('form', TodoCreateDto), (c) => {
    const {title} = c.req.valid("form");
    addTodo(db, title)
    return c.redirect("/")
})

// HTML supports only POST, so for DELETE/PUT/PATCH we use a POST
app.post('/todos/:id/delete', zValidator('param', Todo.pick({id: true})), (c) => {
    const id = c.req.valid('param').id
    deleteTodo(db, id)
    return c.redirect("/")
})

app.post('/todos/:id/toggle', zValidator('param', Todo.pick({id: true})), (c) => {
    const id = c.req.valid('param').id
    toggleTodo(db, id)
    return c.redirect("/")
})

app.post('/todos/:id/edit',
    zValidator('param', Todo.pick({id: true})),
    zValidator('form', Todo.pick({title: true})),
    (c) => {
        const id = c.req.param("id")
        const {title} = c.req.valid('form')
        editTodo(db, id, title)
        return c.redirect("/")
    })

export default app
