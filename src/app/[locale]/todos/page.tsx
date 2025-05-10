'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckSquare, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodosPage() {
  const t = useTranslations('todos');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
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
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary-100">{t('title')}</h1>
      
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder={t('addPlaceholder')}
          className="flex-1"
        />
        <Button onClick={addTodo} className="bg-primary-100 text-bg-100 hover:bg-primary-200">
          {t('add')}
        </Button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-3 bg-bg-200 rounded-lg border border-bg-300"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTodo(todo.id)}
              className={todo.completed ? 'text-primary-100' : 'text-text-200'}
            >
              <CheckSquare className="h-5 w-5" />
            </Button>
            <span className={`flex-1 ${todo.completed ? 'line-through text-text-200' : 'text-text-100'}`}>
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="text-text-200 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 