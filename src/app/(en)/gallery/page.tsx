import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('gallery', 'en');
export default function Page() { return <RoutePage name="gallery" locale="en" />; }
