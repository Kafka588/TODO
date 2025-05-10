'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';

interface Note {
  id: number;
  content: string;
  color: string;
}

const COLORS = [
  'bg-primary-100',
  'bg-accent-100',
  'bg-primary-200',
  'bg-accent-200',
  'bg-primary-300',
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setNotes([...notes, { id: Date.now(), content: newNote.trim(), color: randomColor }]);
      setNewNote('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-bg-200 border-bg-300">
        <CardHeader>
          <CardTitle className="text-primary-100">Sticky Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addNote} className="mb-6">
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="mb-2 bg-bg-300 border-bg-300 text-text-100 placeholder:text-text-200"
            />
            <Button 
              type="submit" 
              className="w-full bg-primary-100 text-bg-100 hover:bg-primary-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <div
                key={note.id}
                className={`${note.color} p-4 rounded-lg shadow-md relative group text-bg-100`}
              >
                <p className="whitespace-pre-wrap">{note.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-bg-100 hover:text-bg-100 hover:bg-bg-300/50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 