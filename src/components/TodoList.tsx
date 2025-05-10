'use client';

import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-md bg-bg-300 text-text-100 border border-bg-300 focus:outline-none focus:border-primary-100"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-100 text-bg-100 rounded-md hover:bg-primary-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-3 bg-bg-300 rounded-md"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`p-1 rounded-full ${
                todo.completed ? 'bg-primary-100 text-bg-100' : 'bg-bg-200'
              }`}
            >
              <Check className="w-4 h-4" />
            </button>
            <span className={`flex-1 ${todo.completed ? 'line-through text-text-200' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-text-200 hover:text-accent-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 