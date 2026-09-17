import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('game', 'fr');
export default function Page() { return <RoutePage name="game" locale="fr" />; }
