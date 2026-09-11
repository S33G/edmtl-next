import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('contact', 'en');
export default function Page() { return <RoutePage name="contact" locale="en" />; }
