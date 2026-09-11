import { socialImage } from '@/lib/social-image';
import { getService, getServices } from '@/lib/services';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() {
  return getServices('en').map(service => ({ slug: service.slug }));
}
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug, 'en');
  if (!service) notFound();
  return socialImage('en', service);
}
