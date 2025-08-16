'use client';

import { HiCheckCircle, HiSparkles, HiEye, HiHomeModern, HiWrenchScrewdriver, HiBeaker } from 'react-icons/hi2';
import Image from 'next/image';

interface ServiceContentProps {
  serviceKey: 'window-cleaning' | 'gutter-services' | 'pressure-washing' | 'deck-refinishing';
  locale?: 'en' | 'fr';
}

export default function ServiceContent({ serviceKey, locale = 'en' }: ServiceContentProps) {
  const services = {
    'window-cleaning': {
      title: locale === 'fr' ? 'Vitres Cristallines' : 'Crystal Clear Windows',
      subtitle: locale === 'fr' ? 'Nettoyage de Vitres Professionnel' : 'Professional Window Cleaning',
      description: locale === 'fr'
        ? 'Services de nettoyage de vitres professionnels pour propriétés résidentielles et commerciales à Montréal. Notre équipe expérimentée livre des résultats sans traces en utilisant équipement professionnel et techniques.'
        : 'Professional window cleaning services for residential and commercial properties in Montreal. Our experienced team delivers streak-free results using professional equipment and techniques.',
      heroImage: '/image01.png',
      services: [
        {
          icon: HiEye,
          title: locale === 'fr' ? 'Nettoyage Intérieur' : 'Interior Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage complet des vitres intérieures incluant cadres, rebords et surfaces vitrées. Nous protégeons vos meubles et planchers tout en livrant des résultats impeccables.'
            : 'Complete interior window cleaning including frames, sills, and glass surfaces. We protect your furniture and floors while delivering spotless results.',
          features: locale === 'fr'
            ? ['Technique de raclette professionnelle', 'Nettoyage des cadres et rebords', 'Protection des meubles']
            : ['Professional squeegee technique', 'Frame and sill cleaning', 'Furniture protection'],
          image: '/image01.png'
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Nettoyage Extérieur' : 'Exterior Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage professionnel des vitres extérieures utilisant systèmes d\'eau purifiée et équipement spécialisé pour enlever saleté, graisse et accumulation environnementale.'
            : 'Professional exterior window cleaning using purified water systems and specialized equipment to remove dirt, grime, and environmental buildup.',
          features: locale === 'fr'
            ? ['Système de nettoyage à l\'eau pure', 'Équipement de sécurité', 'Techniques sans traces']
            : ['Pure water cleaning system', 'Safety equipment', 'Streak-free techniques'],
          image: '/images/gutter-cleaning-after-1.jpg'
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Services Commerciaux' : 'Commercial Services',
          description: locale === 'fr'
            ? 'Services de nettoyage de vitres spécialisés pour bâtiments commerciaux, bureaux et propriétés de vente au détail avec calendriers flexibles.'
            : 'Specialized window cleaning services for commercial buildings, offices, and retail properties with flexible scheduling.',
          features: locale === 'fr'
            ? ['Calendrier flexible', 'Assurance commerciale', 'Service régulier']
            : ['Flexible scheduling', 'Commercial insurance', 'Regular service'],
          image: '/images/gutter-cleaning-after-2.jpg'
        }
      ]
    },
    'gutter-services': {
      title: locale === 'fr' ? 'Services de Gouttières' : 'Gutter Services',
      subtitle: locale === 'fr' ? 'Nettoyage et Entretien de Gouttières' : 'Gutter Cleaning & Maintenance',
      description: locale === 'fr'
        ? 'Services complets de gouttières incluant nettoyage, réparations et entretien préventif pour protéger votre propriété des dommages d\'eau.'
        : 'Complete gutter services including cleaning, repairs, and preventive maintenance to protect your property from water damage.',
      heroImage: '/images/gutter-cleaning-after-1.jpg',
      services: [
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Nettoyage de Gouttières' : 'Gutter Cleaning',
          description: locale === 'fr'
            ? 'Enlèvement professionnel des feuilles, débris et blocages de vos gouttières et tuyaux de descente.'
            : 'Professional removal of leaves, debris, and blockages from your gutters and downspouts.',
          features: locale === 'fr'
            ? ['Nettoyage manuel complet', 'Test de débit d\'eau', 'Nettoyage des tuyaux de descente']
            : ['Complete hand cleaning', 'Water flow testing', 'Downspout cleaning'],
          image: '/images/gutter-cleaning-before-1.jpg'
        },
        {
          icon: HiWrenchScrewdriver,
          title: locale === 'fr' ? 'Installation de Protège-Gouttières' : 'Gutter Guard Installation',
          description: locale === 'fr'
            ? 'Installation de systèmes de protection pour prévenir l\'accumulation de débris et réduire l\'entretien futur.'
            : 'Installation of protection systems to prevent debris buildup and reduce future maintenance.',
          features: locale === 'fr'
            ? ['Systèmes de protection durables', 'Installation professionnelle', 'Garantie incluse']
            : ['Durable protection systems', 'Professional installation', 'Warranty included'],
          image: '/images/gutter-guard-installation-1.jpg'
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Entretien et Réparations' : 'Maintenance & Repairs',
          description: locale === 'fr'
            ? 'Inspections régulières, réparations et entretien pour maintenir vos gouttières en parfait état.'
            : 'Regular inspections, repairs, and maintenance to keep your gutters in perfect condition.',
          features: locale === 'fr'
            ? ['Inspections saisonnières', 'Réparations professionnelles', 'Rapports détaillés']
            : ['Seasonal inspections', 'Professional repairs', 'Detailed reports'],
          image: '/images/gutter-cleaning-after-2.jpg'
        }
      ]
    },
    'pressure-washing': {
      title: locale === 'fr' ? 'Lavage à Pression' : 'Pressure Washing',
      subtitle: locale === 'fr' ? 'Services de Lavage à Pression' : 'Pressure Washing Services',
      description: locale === 'fr'
        ? 'Services de lavage à pression professionnels pour nettoyer et restaurer l\'apparence de vos surfaces extérieures.'
        : 'Professional pressure washing services to clean and restore the appearance of your exterior surfaces.',
      heroImage: '/images/moss-removal-after.jpg',
      services: [
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Enlèvement de Mousse' : 'Moss Removal',
          description: locale === 'fr'
            ? 'Enlèvement professionnel de la mousse des toits, allées et surfaces extérieures pour restaurer leur apparence.'
            : 'Professional moss removal from roofs, driveways and exterior surfaces to restore their appearance.',
          features: locale === 'fr'
            ? ['Technique haute pression', 'Traitement antimousse', 'Résultats durables']
            : ['High-pressure technique', 'Anti-moss treatment', 'Long-lasting results'],
          image: '/images/moss-growth-before.jpg'
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Nettoyage de Surfaces' : 'Surface Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage complet des allées, terrasses, trottoirs et autres surfaces extérieures.'
            : 'Complete cleaning of driveways, patios, walkways and other exterior surfaces.',
          features: locale === 'fr'
            ? ['Nettoyage haute pression', 'Enlèvement des taches', 'Restauration complète']
            : ['High-pressure cleaning', 'Stain removal', 'Complete restoration'],
          image: '/images/moss-removal-after.jpg'
        },
        {
          icon: HiBeaker,
          title: locale === 'fr' ? 'Entretien Préventif' : 'Preventive Maintenance',
          description: locale === 'fr'
            ? 'Services d\'entretien régulier pour prévenir l\'accumulation de mousse et maintenir vos surfaces propres.'
            : 'Regular maintenance services to prevent moss buildup and keep your surfaces clean.',
          features: locale === 'fr'
            ? ['Nettoyage saisonnier', 'Traitement préventif', 'Protection durable']
            : ['Seasonal cleaning', 'Preventive treatment', 'Long-term protection'],
          image: '/images/gutter-guard-installation-1.jpg'
        }
      ]
    },
    'deck-refinishing': {
      title: locale === 'fr' ? 'Refinition de Terrasses' : 'Deck Refinishing',
      subtitle: locale === 'fr' ? 'Services de Refinition de Terrasses' : 'Deck Refinishing Services',
      description: locale === 'fr'
        ? 'Services complets de restauration de terrasses incluant nettoyage, ponçage, teinture et scellage.'
        : 'Complete deck restoration services including cleaning, sanding, staining, and sealing.',
      heroImage: '/images/gutter-guard-installation-2.jpg',
      services: [
        {
          icon: HiWrenchScrewdriver,
          title: locale === 'fr' ? 'Préparation de Surface' : 'Surface Preparation',
          description: locale === 'fr'
            ? 'Nettoyage en profondeur et ponçage pour préparer votre terrasse pour la teinture.'
            : 'Deep cleaning and sanding to prepare your deck for staining.',
          features: locale === 'fr'
            ? ['Nettoyage haute pression', 'Ponçage professionnel', 'Préparation minutieuse']
            : ['Power washing', 'Professional sanding', 'Thorough preparation'],
          image: '/images/gutter-cleaning-before-1.jpg'
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Teinture et Scellage' : 'Staining & Sealing',
          description: locale === 'fr'
            ? 'Application de teinture et scellant de haute qualité pour protéger et embellir votre terrasse.'
            : 'Application of high-quality stain and sealant to protect and beautify your deck.',
          features: locale === 'fr'
            ? ['Teintures premium', 'Protection UV', 'Finition durable']
            : ['Premium stains', 'UV protection', 'Long-lasting finish'],
          image: '/images/gutter-guard-installation-3.jpg'
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Entretien Continu' : 'Ongoing Maintenance',
          description: locale === 'fr'
            ? 'Services d\'entretien régulier pour maintenir votre terrasse en excellent état.'
            : 'Regular maintenance services to keep your deck in excellent condition.',
          features: locale === 'fr'
            ? ['Inspections régulières', 'Retouches', 'Conseils d\'entretien']
            : ['Regular inspections', 'Touch-ups', 'Maintenance advice'],
          image: '/images/gutter-cleaning-after-1.jpg'
        }
      ]
    }
  };

  const service = services[serviceKey];

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        {service.heroImage && (
          <div className="mb-6 relative h-48 md:h-64 rounded-xl overflow-hidden">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm border border-yellow-200 dark:border-yellow-800/30">
          <HiSparkles className="w-4 h-4" />
          <span>{service.subtitle}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {service.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {service.services.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 hover:shadow-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300">
              {item.image && (
                <div className="mb-4 relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/40 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <HiCheckCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl p-6 text-center text-white mt-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          {locale === 'fr' ? 'Prêt à commencer?' : 'Ready to get started?'}
        </h3>
        <p className="text-gray-200 mb-4">
          {locale === 'fr' ? 'Contactez-nous pour un devis gratuit' : 'Contact us for a free quote'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="tel:+15145551234"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {locale === 'fr' ? 'Appelez maintenant' : 'Call Now'}
          </a>
          <a
            href="mailto:info@edmtl.ca"
            className="border border-yellow-500 text-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
          >
            {locale === 'fr' ? 'Devis gratuit' : 'Free Quote'}
          </a>
        </div>
      </div>
    </div>
  );
}
