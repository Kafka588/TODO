import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Check if the user's browser language is Mongolian
  const isMongolian = acceptLanguage.toLowerCase().includes('mn');
  
  // Redirect to the appropriate locale
  redirect(isMongolian ? '/mn' : '/en');
} 