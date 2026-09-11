import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('contact', 'fr');
export default function Page() { return <RoutePage name="contact" locale="fr" />; }
