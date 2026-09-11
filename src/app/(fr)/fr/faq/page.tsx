import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('faq', 'fr');
export default function Page() { return <RoutePage name="faq" locale="fr" />; }
