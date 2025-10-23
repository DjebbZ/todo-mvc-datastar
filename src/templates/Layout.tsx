import { html } from "hono/html";
import type { SiteData } from "../logic/types";

const Layout = (props: SiteData) => html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="description" content="A Realtime collaborative TodoMVC written in Datastar and Bun+Hono."/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>${props.title}</title>
        <meta property="og:title" content="${props.title}"/>
        <link rel="stylesheet" href="/static/base.css"/>
        <link rel="stylesheet" href="/static/index.css"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
        <link rel="manifest" href="/static/site.webmanifest">
    </head>
    <body>
        ${props.children}
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Created by Khalid Jebbari, based on the work of the TodoMVC Team</p>
        </footer>
        <script type="text/template" id="item-template">
            <div class="view">
                <input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
                <label><%- title %></label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="<%- title %>">
        </script>
        <script type="text/template" id="stats-template">
            <span class="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
            <ul class="filters">
                <li>
                    <a class="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <% if (completed) { %>
            <button class="clear-completed">Clear completed</button>
            <% } %>
        </script>
    </html>
`;
export default Layout;
