import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('thank-you', 'en');
export default function Page() { return <RoutePage name="thank-you" locale="en" />; }
