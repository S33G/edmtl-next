import RoutePage, { getPageMetadata } from '@/components/RoutePages';
export const metadata = getPageMetadata('faq', 'en');
export default function Page() { return <RoutePage name="faq" locale="en" />; }
