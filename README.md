# Lab 1

Fork of the class todo app. For this lab I added All / Active / Done filtering.

I went with the server-side version (query param on the request) instead of filtering the list in React, since that was what they asked us to practice.

## Backend

Only touched `getTodos` in `backend/controllers/todoController.js`.

- grab `done` from `req.query`
- if it's `"true"` or `"false"`, put `{ done: true/false }` on a filter object
- if the param isn't there, leave the filter as `{}` so every todo comes back
- `Todo.find(filter)` instead of `Todo.find()`

## Frontend

`frontend/src/api/todos.js` — `fetchTodos` takes a filter now. All = no query string. Done = `?done=true`. Active = `?done=false`. Using axios `params` for that.

`frontend/src/App.jsx` — `currentFilter` state (`all` / `active` / `done`). `useEffect` depends on it so changing the tab refetches. Three buttons above the list.

Also styled the buttons a bit in `todo.css`. After add/toggle/delete I reload with the current filter so the list stays correct (e.g. if you mark something done while you're on Active, it should disappear).

## Server vs client filter

Client-side would be easier: load everything once and `todos.filter(...)`. Fewer requests, works fine for a small list.

Server-side means every tab click hits the API. Extra round trip, but you don't pull todos you don't need, and you actually pass the query param through to Mongo. That's the trade-off.

## Run it

Backend: Mongo on `localhost:27017`, then `node server.js` in `backend` (port 3000).

Frontend: `npm run dev` in `frontend` (Vite on 5173).
