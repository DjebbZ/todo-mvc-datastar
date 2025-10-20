import {Hono} from 'hono'
import {Layout} from "./templates";
import {serveStatic} from "hono/bun";
import {SiteData, Todo} from "./types";
import {logger} from "hono/logger";
import {SQL} from "bun"
import {TodosPage} from "./templates/todos-page";

const db = new SQL({
    adapter: "sqlite",
    filename: ":memory:"
})

const app = new Hono()

app.use(logger())
app.use('/static/*', serveStatic({root: './src'}))

app.get('/', (c) => {
    const siteProps: SiteData = {
        title: "TodoStar: Realtime collaborative TodoMVC written in Datastar and Bun+Hono.",
    }

    const todos: Todo[] = [{
        id: 1,
        title: "something to do",
        completed: true,
    }]

    return c.html(
        <Layout {...siteProps}>
            <TodosPage todos={todos}/>
        </Layout>
    )
})


export default app
