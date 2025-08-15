'use client';

import { HiCheckCircle, HiSparkles, HiEye, HiHomeModern, HiWrenchScrewdriver, HiBeaker } from 'react-icons/hi2';

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
      services: [
        {
          icon: HiEye,
          title: locale === 'fr' ? 'Nettoyage Intérieur' : 'Interior Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage complet des vitres intérieures incluant cadres, rebords et surfaces vitrées. Nous protégeons vos meubles et planchers tout en livrant des résultats impeccables.'
            : 'Complete interior window cleaning including frames, sills, and glass surfaces. We protect your furniture and floors while delivering spotless results.',
          features: locale === 'fr'
            ? ['Technique de raclette professionnelle', 'Nettoyage des cadres et rebords', 'Protection des meubles']
            : ['Professional squeegee technique', 'Frame and sill cleaning', 'Furniture protection']
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Nettoyage Extérieur' : 'Exterior Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage professionnel des vitres extérieures utilisant systèmes d\'eau purifiée et équipement spécialisé pour enlever saleté, graisse et accumulation environnementale.'
            : 'Professional exterior window cleaning using purified water systems and specialized equipment to remove dirt, grime, and environmental buildup.',
          features: locale === 'fr'
            ? ['Système de nettoyage à l\'eau pure', 'Équipement de sécurité', 'Techniques sans traces']
            : ['Pure water cleaning system', 'Safety equipment', 'Streak-free techniques']
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Services Commerciaux' : 'Commercial Services',
          description: locale === 'fr'
            ? 'Services de nettoyage de vitres spécialisés pour bâtiments commerciaux, bureaux et propriétés de vente au détail avec calendriers flexibles.'
            : 'Specialized window cleaning services for commercial buildings, offices, and retail properties with flexible scheduling.',
          features: locale === 'fr'
            ? ['Calendrier flexible', 'Assurance commerciale', 'Service régulier']
            : ['Flexible scheduling', 'Commercial insurance', 'Regular service']
        }
      ]
    },
    'gutter-services': {
      title: locale === 'fr' ? 'Services de Gouttières' : 'Gutter Services',
      subtitle: locale === 'fr' ? 'Nettoyage et Entretien de Gouttières' : 'Gutter Cleaning & Maintenance',
      description: locale === 'fr'
        ? 'Services complets de gouttières incluant nettoyage, réparations et entretien préventif pour protéger votre propriété des dommages d\'eau.'
        : 'Complete gutter services including cleaning, repairs, and preventive maintenance to protect your property from water damage.',
      services: [
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Nettoyage de Gouttières' : 'Gutter Cleaning',
          description: locale === 'fr'
            ? 'Enlèvement professionnel des feuilles, débris et blocages de vos gouttières et tuyaux de descente.'
            : 'Professional removal of leaves, debris, and blockages from your gutters and downspouts.',
          features: locale === 'fr'
            ? ['Nettoyage manuel complet', 'Test de débit d\'eau', 'Nettoyage des tuyaux de descente']
            : ['Complete hand cleaning', 'Water flow testing', 'Downspout cleaning']
        },
        {
          icon: HiWrenchScrewdriver,
          title: locale === 'fr' ? 'Réparations de Gouttières' : 'Gutter Repairs',
          description: locale === 'fr'
            ? 'Réparation des fuites, réalignement des sections affaissées et remplacement des composants endommagés.'
            : 'Repair leaks, realign sagging sections, and replace damaged components.',
          features: locale === 'fr'
            ? ['Réparation des fuites', 'Réalignement', 'Remplacement de pièces']
            : ['Leak repairs', 'Realignment', 'Part replacement']
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Entretien Préventif' : 'Preventive Maintenance',
          description: locale === 'fr'
            ? 'Inspections régulières et entretien pour prévenir les problèmes coûteux et prolonger la durée de vie de vos gouttières.'
            : 'Regular inspections and maintenance to prevent costly problems and extend gutter lifespan.',
          features: locale === 'fr'
            ? ['Inspections saisonnières', 'Entretien préventif', 'Rapports détaillés']
            : ['Seasonal inspections', 'Preventive maintenance', 'Detailed reports']
        }
      ]
    },
    'pressure-washing': {
      title: locale === 'fr' ? 'Lavage à Pression' : 'Pressure Washing',
      subtitle: locale === 'fr' ? 'Services de Lavage à Pression' : 'Pressure Washing Services',
      description: locale === 'fr'
        ? 'Services de lavage à pression professionnels pour nettoyer et restaurer l\'apparence de vos surfaces extérieures.'
        : 'Professional pressure washing services to clean and restore the appearance of your exterior surfaces.',
      services: [
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Lavage de Terrasses' : 'Deck Washing',
          description: locale === 'fr'
            ? 'Nettoyage en profondeur des terrasses pour enlever saleté, moisissure et taches.'
            : 'Deep cleaning of decks to remove dirt, mold, and stains.',
          features: locale === 'fr'
            ? ['Technique douce', 'Produits écologiques', 'Restauration de couleur']
            : ['Soft washing technique', 'Eco-friendly products', 'Color restoration']
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Nettoyage d\'Allées' : 'Driveway Cleaning',
          description: locale === 'fr'
            ? 'Enlèvement des taches d\'huile, saleté et décoloration de vos allées et trottoirs.'
            : 'Remove oil stains, dirt, and discoloration from driveways and walkways.',
          features: locale === 'fr'
            ? ['Enlèvement de taches d\'huile', 'Nettoyage haute pression', 'Traitement anti-mousse']
            : ['Oil stain removal', 'High-pressure cleaning', 'Moss treatment']
        },
        {
          icon: HiBeaker,
          title: locale === 'fr' ? 'Nettoyage de Revêtement' : 'Siding Cleaning',
          description: locale === 'fr'
            ? 'Lavage doux des revêtements pour enlever moisissure, algues et accumulation de saleté.'
            : 'Gentle washing of siding to remove mold, algae, and dirt buildup.',
          features: locale === 'fr'
            ? ['Lavage doux', 'Technique sans dommage', 'Traitement antimicrobien']
            : ['Soft washing', 'Damage-free technique', 'Anti-microbial treatment']
        }
      ]
    },
    'deck-refinishing': {
      title: locale === 'fr' ? 'Refinition de Terrasses' : 'Deck Refinishing',
      subtitle: locale === 'fr' ? 'Services de Refinition de Terrasses' : 'Deck Refinishing Services',
      description: locale === 'fr'
        ? 'Services complets de restauration de terrasses incluant nettoyage, ponçage, teinture et scellage.'
        : 'Complete deck restoration services including cleaning, sanding, staining, and sealing.',
      services: [
        {
          icon: HiWrenchScrewdriver,
          title: locale === 'fr' ? 'Préparation de Surface' : 'Surface Preparation',
          description: locale === 'fr'
            ? 'Nettoyage en profondeur et ponçage pour préparer votre terrasse pour la teinture.'
            : 'Deep cleaning and sanding to prepare your deck for staining.',
          features: locale === 'fr'
            ? ['Nettoyage haute pression', 'Ponçage professionnel', 'Préparation minutieuse']
            : ['Power washing', 'Professional sanding', 'Thorough preparation']
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Teinture et Scellage' : 'Staining & Sealing',
          description: locale === 'fr'
            ? 'Application de teinture et scellant de haute qualité pour protéger et embellir votre terrasse.'
            : 'Application of high-quality stain and sealant to protect and beautify your deck.',
          features: locale === 'fr'
            ? ['Teintures premium', 'Protection UV', 'Finition durable']
            : ['Premium stains', 'UV protection', 'Long-lasting finish']
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Entretien Continu' : 'Ongoing Maintenance',
          description: locale === 'fr'
            ? 'Services d\'entretien régulier pour maintenir votre terrasse en excellent état.'
            : 'Regular maintenance services to keep your deck in excellent condition.',
          features: locale === 'fr'
            ? ['Inspections régulières', 'Retouches', 'Conseils d\'entretien']
            : ['Regular inspections', 'Touch-ups', 'Maintenance advice']
        }
      ]
    }
  };

  const service = services[serviceKey];

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 dark:bg-teal-900/30 text-[var(--primary)] dark:text-teal-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
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
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--primary)]/10 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[var(--primary)] dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <HiCheckCircle className="w-4 h-4 text-[var(--success)] dark:text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-teal-700 dark:from-teal-600 dark:to-teal-800 rounded-xl p-6 text-center text-white mt-8">
        <h3 className="text-xl font-semibold mb-2">
          {locale === 'fr' ? 'Prêt à commencer?' : 'Ready to get started?'}
        </h3>
        <p className="text-teal-100 mb-4">
          {locale === 'fr' ? 'Contactez-nous pour un devis gratuit' : 'Contact us for a free quote'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="tel:+15145551234"
            className="bg-white text-[var(--primary)] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            {locale === 'fr' ? 'Appelez maintenant' : 'Call Now'}
          </a>
          <a
            href="mailto:info@edmtl.ca"
            className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            {locale === 'fr' ? 'Devis gratuit' : 'Free Quote'}
          </a>
        </div>
      </div>
    </div>
  );
}
