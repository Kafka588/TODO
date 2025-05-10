import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study Buddy - Your All-in-One Study Companion",
  description: "A modern study companion with todo list, pomodoro timer, and note-taking features.",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-bg-100 text-text-100 min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <header className="sticky top-0 z-50">
            <Navigation messages={messages} locale={locale} />
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 