import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('privacy-policy', 'fr');
export default function Page() { return <RoutePage name="privacy-policy" locale="fr" />; }
