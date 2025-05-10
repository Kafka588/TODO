'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  locale: string;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'mn' : 'en';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      className="text-text-100 hover:text-primary-100 hover:bg-bg-300"
      title={locale === 'en' ? 'Монгол хэл рүү шилжих' : 'Switch to English'}
    >
      <Languages className="h-5 w-5" />
    </Button>
  );
} 