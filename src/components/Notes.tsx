'use client';

import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { FileText, Plus, Trash2, Save } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const updatedNotes = notes.map(note =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    );
    setNotes(updatedNotes);
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates });
    }
  };

  return (
    <div className="flex h-[600px] bg-bg-200 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-bg-300 p-4 flex flex-col">
        <button
          onClick={createNewNote}
          className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-bg-100 rounded-md hover:bg-primary-200 transition-colors mb-4"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
        <div className="flex-1 overflow-y-auto">
          {notes.map(note => (
            <div
              key={note.id}
              className={`p-3 rounded-md cursor-pointer mb-2 flex items-center justify-between group ${
                selectedNote?.id === note.id ? 'bg-primary-100 text-bg-100' : 'hover:bg-bg-200'
              }`}
              onClick={() => {
                setSelectedNote(note);
                setIsEditing(false);
              }}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="truncate">{note.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-accent-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 flex flex-col">
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                className="text-xl font-semibold bg-transparent border-none focus:outline-none text-primary-100"
              />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-primary-100 text-bg-100 rounded-md hover:bg-primary-200 transition-colors"
              >
                {isEditing ? 'Preview' : 'Edit'}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" data-color-mode="dark">
              {isEditing ? (
                <MDEditor
                  value={selectedNote.content}
                  onChange={(value) => updateNote(selectedNote.id, { content: value || '' })}
                  preview="edit"
                  height="100%"
                />
              ) : (
                <MDEditor.Markdown
                  source={selectedNote.content}
                  style={{ backgroundColor: 'transparent' }}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-text-200">
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  );
} 