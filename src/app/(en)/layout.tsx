import SiteLayout from '@/components/SiteLayout';
export const metadata = { metadataBase: new URL('https://edmtl.com') };
export default function Layout({children}:{children:React.ReactNode}) { return <SiteLayout locale="en">{children}</SiteLayout>; }
