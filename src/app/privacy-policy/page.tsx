import { Metadata } from 'next';
import Footer from '../../components/Footer';
import SubpageHeader from '../../components/SubpageHeader';
import PrivacyPolicyContent from '../../components/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for EDMTL - Entretien Domestique Montreal. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://edmtl.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen hex-pattern bg-[var(--background)]">
      <SubpageHeader />
      <PrivacyPolicyContent />
      <Footer />
    </div>
  );
}
