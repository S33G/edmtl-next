import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('home', 'fr');
export default function Page() { return <RoutePage name="home" locale="fr" />; }
