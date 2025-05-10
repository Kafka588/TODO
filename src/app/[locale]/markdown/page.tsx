'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MarkdownNote {
  id: number;
  content: string;
}

export default function MarkdownPage() {
  const t = useTranslations('markdown');
  const [notes, setNotes] = useState<MarkdownNote[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote.trim() }]);
      setNewNote('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary-100">{t('title')}</h1>
      
      <div className="space-y-4">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={t('contentPlaceholder')}
          className="min-h-[100px] font-mono"
        />
        <Button
          onClick={addNote}
          className="bg-primary-100 text-bg-100 hover:bg-primary-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('newNote')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-4 bg-bg-200 rounded-lg border border-bg-300 relative group"
          >
            <div className="markdown-content">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-text-200 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 