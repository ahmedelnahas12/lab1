# Lab 1

I added filters so you can see all todos, only active, or only done.

## Backend

In `todoController.js` I changed `getTodos`.

It reads `done` from the query. If there is no `done` it returns everything. If there is, it uses `Todo.find(filter)`.

## Frontend

In `api/todos.js` I made `fetchTodos` send the filter as a query param.

In `App.jsx` I added All / Active / Done buttons and some state. When you click a button it fetches again.
