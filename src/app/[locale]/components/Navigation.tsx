import { useMessages, useLocale } from 'next-intl';
import { NavigationClient } from '@/app/[locale]/components/NavigationClient';

export function Navigation() {
  const messages = useMessages();
  const locale = useLocale();
  return <NavigationClient messages={messages} locale={locale} />;
} 