'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckSquare, Timer, StickyNote, FileText, Home } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  {
    href: '/',
    label: 'home',
    icon: Home,
  },
  {
    href: '/todos',
    label: 'todos',
    icon: CheckSquare,
  },
  {
    href: '/pomodoro',
    label: 'pomodoro',
    icon: Timer,
  },
  {
    href: '/notes',
    label: 'stickyNotes',
    icon: StickyNote,
  },
  {
    href: '/markdown',
    label: 'markdownNotes',
    icon: FileText,
  },
];

interface NavigationProps {
  messages: {
    navigation: {
      [key: string]: string;
    };
  };
  locale: string;
}

export function Navigation({ messages, locale }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 bg-bg-200 border-b border-bg-300">
      <div className="flex items-center space-x-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const href = `/${locale}${item.href}`;
          return (
            <Link key={item.href} href={href}>
              <Button
                variant={pathname === href ? 'default' : 'ghost'}
                className={cn(
                  'flex items-center space-x-2',
                  pathname === href
                    ? 'bg-primary-100 text-bg-100 hover:bg-primary-200 hover:text-bg-100'
                    : 'text-text-100 hover:text-primary-100 hover:bg-bg-300'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{messages?.navigation?.[item.label] || item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
      <LanguageSwitcher locale={locale} />
    </nav>
  );
} 