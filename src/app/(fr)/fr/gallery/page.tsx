import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('gallery', 'fr');
export default function Page() { return <RoutePage name="gallery" locale="fr" />; }
