'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MarkdownNote {
  id: number;
  title: string;
  content: string;
}

export default function MarkdownPage() {
  const [notes, setNotes] = useState<MarkdownNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<MarkdownNote | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const saveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id
          ? { ...note, title, content }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title, content });
    }
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-bg-200 border-bg-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary-100">Markdown Notes</CardTitle>
            <Button 
              onClick={createNewNote}
              className="bg-primary-100 text-bg-100 hover:bg-primary-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notes List */}
            <div className="space-y-2">
              {notes.map(note => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-bg-300 transition-colors ${
                    selectedNote?.id === note.id ? 'bg-bg-300' : ''
                  }`}
                  onClick={() => {
                    setSelectedNote(note);
                    setTitle(note.title);
                    setContent(note.content);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate text-text-100">{note.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="h-8 w-8 text-accent-100 hover:text-accent-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Editor and Preview */}
            <div className="lg:col-span-2 space-y-4">
              {selectedNote ? (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-md border bg-bg-300 border-bg-300 text-text-100"
                      placeholder="Note title"
                    />
                    <Button 
                      onClick={saveNote}
                      className="bg-primary-100 text-bg-100 hover:bg-primary-200"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your markdown here..."
                        className="h-[500px] font-mono bg-bg-300 border-bg-300 text-text-100 placeholder:text-text-200"
                      />
                    </div>
                    <div className="prose prose-sm max-w-none dark:prose-invert p-4 border border-bg-300 rounded-md h-[500px] overflow-auto bg-bg-300">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-text-200 py-12">
                  Select a note or create a new one to get started
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 