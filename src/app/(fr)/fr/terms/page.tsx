import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('terms', 'fr');
export default function Page() { return <RoutePage name="terms" locale="fr" />; }
