// App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './todo.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
];

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');

  const loadTodos = async () => {
    setLoading(true);

    try {
      const data = await fetchTodos(currentFilter);
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [currentFilter]);

  const handleAdd = async (title) => {
    await createTodo(title);
    await loadTodos();
  };

  const handleToggle = async (id, done) => {
    await updateTodo(id, { done: !done });
    await loadTodos();
  };

  const handleRename = async (id, title) => {
    await updateTodo(id, { title });
    await loadTodos();
  };

  const handleRemove = async (id) => {
    await deleteTodo(id);
    await loadTodos();
  };

  return (
    <div className="receipt-page">
      <div className="receipt">
        <header className="receipt-header">
          <span className="stamp">Tasks</span>
          <p className="receipt-date">{today}</p>
        </header>

        <div className="todo-filters" aria-label="Todo filters">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={currentFilter === key ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setCurrentFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <TodoForm onAdd={handleAdd} />
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
