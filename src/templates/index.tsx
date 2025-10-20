import {html} from "hono/html";
import {SiteData} from "../types";


export const Layout = (props: SiteData) => html`
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="description" content="A Realtime collaborative TodoMVC written in Datastar and Bun+Hono."/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>${props.title}</title>
        <meta property="og:title" content="${props.title}"/>
        <link rel="stylesheet" href="/static/base.css" />
        <link rel="stylesheet" href="/static/index.css" />
    </head>
    <body>
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" placeholder="What needs to be done?" autofocus/>
            </header>
            <main class="main">
                <div class="toggle-all-container">
                    <input class="toggle-all" id="toggle-all" type="checkbox"/>
                    <label for="toggle-all">Mark all as complete</label>
                </div>
                <ul class="todo-list"></ul>
            </main>
            <footer class="footer"></footer>
        </section>
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
`