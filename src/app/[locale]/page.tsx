'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckSquare, Timer, StickyNote, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary-100">
          {t('title')}
        </h1>
        <p className="text-xl text-text-200">
          {t('subtitle')}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-bg-200 rounded-lg border border-bg-300">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            {t('features.todos.title')}
          </h2>
          <p className="text-text-200 mb-4">
            {t('features.todos.description')}
          </p>
          <Link href={`/${locale}/todos`}>
            <Button className="bg-primary-100 text-bg-100 hover:bg-primary-200">
              <CheckSquare className="h-5 w-5 mr-2" />
              {t('features.todos.title')}
            </Button>
          </Link>
        </div>

        <div className="p-6 bg-bg-200 rounded-lg border border-bg-300">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            {t('features.pomodoro.title')}
          </h2>
          <p className="text-text-200 mb-4">
            {t('features.pomodoro.description')}
          </p>
          <Link href={`/${locale}/pomodoro`}>
            <Button className="bg-primary-100 text-bg-100 hover:bg-primary-200">
              <Timer className="h-5 w-5 mr-2" />
              {t('features.pomodoro.title')}
            </Button>
          </Link>
        </div>

        <div className="p-6 bg-bg-200 rounded-lg border border-bg-300">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            {t('features.stickyNotes.title')}
          </h2>
          <p className="text-text-200 mb-4">
            {t('features.stickyNotes.description')}
          </p>
          <Link href={`/${locale}/notes`}>
            <Button className="bg-primary-100 text-bg-100 hover:bg-primary-200">
              <StickyNote className="h-5 w-5 mr-2" />
              {t('features.stickyNotes.title')}
            </Button>
          </Link>
        </div>

        <div className="p-6 bg-bg-200 rounded-lg border border-bg-300">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            {t('features.markdownNotes.title')}
          </h2>
          <p className="text-text-200 mb-4">
            {t('features.markdownNotes.description')}
          </p>
          <Link href={`/${locale}/markdown`}>
            <Button className="bg-primary-100 text-bg-100 hover:bg-primary-200">
              <FileText className="h-5 w-5 mr-2" />
              {t('features.markdownNotes.title')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 