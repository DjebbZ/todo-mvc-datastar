// noinspection SqlNoDataSourceInspection

import {Hono} from 'hono'
import Layout from "./templates/Layout";
import {serveStatic} from "hono/bun";
import {SiteData, Todo, TodoCreateDto} from "./logic/types";
import {logger} from "hono/logger";
import {Database} from "bun:sqlite"
import TodosPage from "./templates/TodosPage";
import {zValidator} from "@hono/zod-validator";

const db = new Database(":memory:", {
    create: true,
})
db.run("PRAGMA journal_mode = WAL;")
db.run(`CREATE TABLE IF NOT EXISTS todos
        (
            id    TEXT PRIMARY KEY
                CHECK (length(id) = 36 AND substr(id, 15, 1) = '7'), -- UUIDv7 format check
            title TEXT    NOT NULL
                CHECK (length(title) >= 5 AND length(title) <= 50),
            done  BOOLEAN NOT NULL DEFAULT 0
        );`)

const app = new Hono()

app.use(logger())
app.use('/static/*', serveStatic({root: './src'}))

app.get('/', (c) => {
    const siteProps: SiteData = {
        title: "TodoStar: Realtime collaborative TodoMVC written in Datastar and Bun+Hono.",
    }

    const query = db.query("SELECT * FROM todos")
    const todos = query.all()

    return c.html(
        <Layout {...siteProps}>
            <TodosPage todos={todos}/>
        </Layout>
    )
})

app.post('/todos', zValidator('form', TodoCreateDto), async (c) => {
    const {title} = c.req.valid("form");

    const query =
        db.query("INSERT INTO todos (title) VALUES ($title)")
    query.run({$title: title})

    return c.redirect("/")
})

export default app
