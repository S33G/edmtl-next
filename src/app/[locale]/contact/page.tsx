import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleContactRedirect({ params }: PageProps) {
  await params;
  redirect('/contact');
}
