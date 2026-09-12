import ServicePage from '@/components/ServicePage';
import { getService, getServices } from '@/lib/services';
import { pageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
export const dynamicParams = false;
export function generateStaticParams() { return getServices('fr').map(service=>({slug:service.slug})); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug, 'fr');
  if (!service) notFound();
  return pageMetadata('fr', '/services/' + slug, service.pageTitle, service.description);
}
export default async function Page({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; return <ServicePage locale="fr" slug={slug} />; }
