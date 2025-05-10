import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  try {
    return {
      locale: locale || 'en',
      messages: (await import(`./messages/${locale || 'en'}.json`)).default
    };
  } catch (error) {
    return {
      locale: 'en',
      messages: (await import('./messages/en.json')).default
    };
  }
}); 