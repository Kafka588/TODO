'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Note {
  id: number;
  text: string;
  position: { x: number; y: number };
}

export function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: newNote.trim(),
          position: { x: 0, y: 0 },
        },
      ]);
      setNewNote('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNotePosition = (id: number, x: number, y: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, position: { x, y } } : note
      )
    );
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addNote} className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="flex-1 px-4 py-2 rounded-md bg-bg-300 text-text-100 border border-bg-300 focus:outline-none focus:border-primary-100"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-100 text-bg-100 rounded-md hover:bg-primary-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="relative min-h-[300px] bg-bg-300 rounded-lg p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="absolute p-4 bg-primary-100 text-bg-100 rounded-md shadow-lg cursor-move"
            style={{
              transform: `translate(${note.position.x}px, ${note.position.y}px)`,
            }}
            draggable
            onDragEnd={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
              if (parentRect) {
                updateNotePosition(
                  note.id,
                  e.clientX - parentRect.left - rect.width / 2,
                  e.clientY - parentRect.top - rect.height / 2
                );
              }
            }}
          >
            <div className="flex justify-between items-start gap-4">
              <p className="flex-1">{note.text}</p>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-bg-100 hover:text-accent-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 