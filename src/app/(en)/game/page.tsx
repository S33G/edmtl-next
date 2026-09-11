import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('game', 'en');
export default function Page() { return <RoutePage name="game" locale="en" />; }
