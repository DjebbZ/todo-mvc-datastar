import {Hono} from 'hono'
import {Layout} from "./templates";
import {serveStatic} from "hono/bun";
import {SiteData} from "./templates/types";

const app = new Hono()

app.use('/static/*', serveStatic({ root: './src'}))

app.get('/', (c) => {
    const props: SiteData = {
        title: "TodoStar: Realtime collaborative TodoMVC written in Datastar and Bun+Hono.",
    }

    return c.html(
        <Layout {...props} />
    )
})


export default app
