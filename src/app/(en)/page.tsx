import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('home', 'en');
export default function Page() { return <RoutePage name="home" locale="en" />; }
