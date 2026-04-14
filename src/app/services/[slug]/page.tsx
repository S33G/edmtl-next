import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import servicesData from '../../../../config/services.json';
import siteConfig from '../../../../config/site.json';
import Footer from '../../../components/Footer';
import SubpageHeader from '../../../components/SubpageHeader';
import ServicePageContent from '../../../components/ServicePageContent';

interface LocalizedString {
  en: string;
  fr: string;
}

interface RawService {
  slug: string;
  title: LocalizedString;
  pageTitle: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getRawService(slug: string): RawService | undefined {
  return (servicesData.services as RawService[]).find((s) => s.slug === slug);
}

export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getRawService(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.pageTitle.en,
    description: service.description.en,
    keywords: `${service.title.en}, Montreal, EDMTL, home maintenance, ${service.slug.replace(/-/g, ' ')}`,
    openGraph: {
      title: `${service.pageTitle.en} | EDMTL`,
      description: service.description.en,
      url: `https://edmtl.com/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.pageTitle.en} | EDMTL`,
      description: service.description.en,
    },
    alternates: {
      canonical: `https://edmtl.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getRawService(slug);

  if (!service) {
    return notFound();
  }

  const phone = siteConfig.contact.phone;

  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)]">
      <SubpageHeader />
      <ServicePageContent slug={slug} phone={phone} />
      <Footer />
    </div>
  );
}
