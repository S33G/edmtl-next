import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('terms', 'en');
export default function Page() { return <RoutePage name="terms" locale="en" />; }
