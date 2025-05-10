'use client';

import { useMessages, useLocale } from 'next-intl';
import { Navigation } from './Navigation';

export function NavigationWrapper() {
  const messages = useMessages() as { navigation: { [key: string]: string; } };
  const locale = useLocale();
  return <Navigation messages={messages} locale={locale} />;
} 