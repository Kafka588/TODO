'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckSquare, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodosPage() {
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
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-bg-200 border-bg-300">
        <CardHeader>
          <CardTitle className="text-primary-100">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTodo} className="flex gap-2 mb-4">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-bg-300 border-bg-300 text-text-100 placeholder:text-text-200"
            />
            <Button 
              type="submit"
              className="bg-primary-100 text-bg-100 hover:bg-primary-200"
            >
              Add
            </Button>
          </form>

          <div className="space-y-2">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-bg-300 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodo(todo.id)}
                    className={todo.completed ? 'text-primary-100' : 'text-text-200'}
                  >
                    <CheckSquare className="h-5 w-5" />
                  </Button>
                  <span className={todo.completed ? 'line-through text-text-200' : 'text-text-100'}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-accent-100 hover:text-accent-200"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 