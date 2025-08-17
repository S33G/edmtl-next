'use client';

import { HiCheckCircle, HiSparkles, HiEye, HiHomeModern, HiWrenchScrewdriver, HiBeaker } from 'react-icons/hi2';

interface ServiceContentProps {
  serviceKey: 'window-cleaning' | 'gutter-services' | 'pressure-washing' | 'deck-refinishing';
  locale?: 'en' | 'fr';
}

export default function ServiceContent({ serviceKey, locale = 'en' }: ServiceContentProps) {
  const services = {
    'window-cleaning': {
      title: locale === 'fr' ? 'Nettoyage de Vitres' : 'Traditional & Water-Fed Window Cleaning',
      subtitle: locale === 'fr' ? 'Nettoyage de Vitres Professionnel' : 'Professional Window Cleaning',
      description: locale === 'fr'
        ? 'Services de nettoyage de vitres professionnels pour propriétés résidentielles et commerciales à Montréal. Notre équipe entièrement assurée et expérimentée livre des résultats excellents en utilisant techniques bien pratiquées et équipement de haute qualité.'
        : 'Professional window cleaning services for residental and commercial properties in Montreal. Our fully insured and experienced team delivers excellent results using well practiced techniques and high quality equipment.',
      services: [
        {
          icon: HiEye,
          title: locale === 'fr' ? 'Nettoyage Intérieur' : 'Interior Cleaning',
          description: locale === 'fr'
            ? 'Avoir vos vitres nettoyées à l\'intérieur et à l\'extérieur fait une énorme différence pour l\'éclairage naturel et la qualité de l\'air de votre maison. Le mécanisme d\'ouverture va rouiller et se détériorer s\'il n\'est pas entretenu.'
            : 'Having both inside and outside of your windows cleaned makes a huge difference to your home\'s natural lighting and air quality.The opening mechanism will rust and deteriorate when not maintained.',
          features: locale === 'fr'
            ? ['Cadres et Rebords', 'Rails de Fenêtres', 'Moustiquaires']
            : ['Frames and Sills', 'Window Tracks', 'Mosquito Screens']
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Nettoyage Extérieur' : 'Exterior Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage de vitres de qualité professionnelle. Pour atteindre nos standards méticuleux chez EDM, pour la plupart des propriétés résidentielles nous détaillons les vitres à la main avec une raclette et un tissu microfibre propre de manière sûre et efficace.'
            : 'Professional grade window cleaning. To reach our meticulous standards at EDM, for most residential properties we detail windows by hand with a squeegee and clean microfibre cloth in a safe and effective manner. Our efficiency allows for better pricing and our skill ensures guaranteed results.',
          features: locale === 'fr'
            ? ['Méthodes traditionnelles et pratiquées', 'Approche d\'accès sûre et sécurisée', 'Résultats sans traces']
            : ['Traditional & practiced methods', 'Safe and secure access approach', 'Streak-free results']
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Services Commerciaux' : 'Commercial Services',
          description: locale === 'fr'
            ? 'Services de nettoyage de vitres spécialisés pour bâtiments commerciaux, bureaux et propriétés de vente au détail avec horaires flexibles.'
            : 'Specialized window cleaning services for commercial buildings, offices, and retail properties with flexible scheduling.',
          features: locale === 'fr'
            ? ['Horaires flexibles', 'Service régulier disponible', 'Entièrement assuré pour opérer']
            : ['Flexible scheduling', 'Regular servicing available', 'Fully insured to operate']
        }
      ]
    },
    'gutter-services': {
      title: locale === 'fr' ? 'Services de Gouttières' : 'Gutter Services',
      subtitle: locale === 'fr' ? 'Nettoyage et Entretien de Gouttières' : 'Gutter Services',
      description: locale === 'fr'
        ? 'Services complets de gouttières incluant nettoyage, réparations et entretien préventif pour protéger votre propriété des dommages d\'eau.'
        : 'Complete gutter services including cleaning, repairs, and preventive maintenance to protect your property from water damage.',
      services: [
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Nettoyage de Gouttières' : 'Gutter Cleaning',
          description: locale === 'fr'
            ? 'Enlèvement à la main sans dégâts des feuilles et débris suivi d\'un rinçage complet du système incluant les tuyaux de descente pour assurer une évacuation efficace de l\'eau. Chaque nettoyage de gouttières inclut un diagnostic d\'aperçu et des photos sur demande.'
            : 'No-mess, hand removal of leaves & debris followed by a full system flush including downspouts to ensure efficient water evacuation. Every gutter cleaning includes an overview diagnosis and pictures upon request.',
          features: locale === 'fr'
            ? ['Nettoyage manuel complet et rinçage', 'Test de débit d\'eau', 'Nettoyage des tuyaux de descente']
            : ['Complete hand-cleaning & rinse', 'Water flow testing', 'Downspout clearance']
        },
        {
          icon: HiWrenchScrewdriver,
          title: locale === 'fr' ? 'Installation de Protège-Gouttières' : 'Gutter Guard Installation',
          description: locale === 'fr'
            ? 'Les propriétés avec de nombreux arbres en surplomb peuvent nécessiter une protection supplémentaire contre les débris qui tombent. Systèmes de protection sur mesure pour aider à prévenir l\'accumulation et les blocages pour réduire l\'entretien futur.'
            : 'Properties with many overhanging trees may require further protection from falling debris. Custom fitted guard systems to help prevent build up & blockage to reduce future maintenance.',
          features: locale === 'fr'
            ? ['Système de protection durable', 'Installation de qualité professionnelle', 'Garantie produit incluse']
            : ['Durable protection system', 'Professional quality installation', 'Product warranty included']
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Entretien et Réparations' : 'Maintenance & Repairs',
          description: locale === 'fr'
            ? 'Blocages, fuites et remplacement de la plupart des composants sont tous des services disponibles chez nous. Nous pouvons concevoir et appliquer la solution correcte à vos problèmes de drainage de gouttières.'
            : 'Blockages, leaks & replacement of most components are all services available from us. We can design and apply the correct solution to your gutter drainage issues.',
          features: locale === 'fr'
            ? ['Planification de service saisonnier', 'Réparations de fuites', 'Diagnostic d\'aperçu détaillé avec photo et vidéo']
            : ['Seasonal service scheduling', 'Leak repairs', 'Detailed overview diagnosis with picture & video']
        }
      ]
    },
    'pressure-washing': {
      title: locale === 'fr' ? 'Lavage à Pression et Doux' : 'Pressure & Soft Washing',
      subtitle: locale === 'fr' ? 'Services de Lavage à Pression' : 'Pressure & Soft Washing Services',
      description: locale === 'fr'
        ? 'Services de lavage à pression et doux professionnels pour nettoyer et restaurer l\'apparence des diverses surfaces extérieures de votre propriété. Nous enlevons aussi les vignes dans de nombreux cas.'
        : 'Professional pressure & soft washing services to clean and restore the appearance of the various exterior surfaces of your property. We also remove vines in many cases.',
      services: [
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Nettoyage de Surfaces Dures' : 'Hard Surface Cleaning',
          description: locale === 'fr'
            ? 'Nettoyage à pression sûr et professionnel des allées, terrasses, trottoirs et autres surfaces extérieures.'
            : 'Safe and professional pressure cleaning of driveways, patios, walkways & other exterior surfaces.',
          features: locale === 'fr'
            ? ['Nettoyage haute pression', 'Enlèvement des taches', 'Résultats restaurateurs']
            : ['High pressure cleaning', 'Stain removal', 'Restorative results']
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Nettoyage de Surfaces Douces' : 'Soft Surface Cleaning',
          description: locale === 'fr'
            ? 'Services de lavage doux sûrs et professionnels pour des surfaces plus fragiles et délicates comme le revêtement en vinyle, les clôtures, les portes d\'entrée, les portes de garage et plus.'
            : 'Safe and professional soft-wash services for more fragile and delicate surfaces such as vinyl siding, fences, entrance doors, garage doors and more.',
          features: locale === 'fr'
            ? ['Méthodes de nettoyage à basse pression, à la main', 'Produits standard de l\'industrie sûrs', 'Résultats restaurateurs sans saleté']
            : ['Low pressure, hand cleaning methods', 'Safe industry standard products', 'Restorative grime free results']
        },
        {
          icon: HiBeaker,
          title: locale === 'fr' ? 'Enlèvement de Mousse' : 'Moss Removal',
          description: locale === 'fr'
            ? 'La mousse peut pousser dans de nombreux environnements, prospérant dans les zones ombragées et humides mais aussi sur les tuiles de toit et les allées. Nous avons des méthodes et des produits de qualité pour enlever et prolonger l\'absence de croissance future. Nous pouvons aussi enlever les vignes dans de nombreux cas.'
            : 'Moss can grow in many environment, thriving in shady and damp areas but also on roof tiles and driveways. We have methods and quality products to remove and prolong the absence of further growth. We can also remove vines in many cases.',
          features: locale === 'fr'
            ? ['Enlèvement par frottage à la main', 'Traitement à l\'hypochlorite de sodium (SH)', 'Résultats durables']
            : ['Hand-scrub removal', 'Sodium Hypochlorite (SH) treatment', 'Long lasting results']
        }
      ]
    },
    'deck-refinishing': {
      title: locale === 'fr' ? 'Rénovation de Terrasses' : 'Deck Refinishing',
      subtitle: locale === 'fr' ? 'Services de Rénovation de Terrasses' : 'Deck Refinishing Services',
      description: locale === 'fr'
        ? 'Divers niveaux de service personnalisés à vos besoins. Ponçage, teinture, scellage, lavage et éclaircissement. Disponible pour les terrasses en bois et composites.'
        : 'Various service levels custom to your needs. Sanding, staining, sealing, washing & brightening. Available for both wood & composite decking.',
      services: [
        {
          icon: HiWrenchScrewdriver,
          title: locale === 'fr' ? 'Service de Lavage et d\'Éclaircissement' : 'Wash & Brighten Service',
          description: locale === 'fr'
            ? 'Les algues, la saleté et autres contaminants altèrent l\'apparence des terrasses en bois ou composites. Nous fournissons un service de lavage et d\'éclaircissement pour enlever la saleté et restaurer votre investissement à une finition propre.'
            : 'Algae, dirt and other contaminants alter the appearance of wood or composite decks. We provide a wash & brighten service to remove grime and restore your investment to a clean finish.',
          features: locale === 'fr'
            ? ['Lavage à basse pression', 'Application de pré-lavage', 'Produits de qualité industrielle de haute qualité']
            : ['Low pressure washing', 'Pre-wash application', 'High quality industry grade products']
        },
        {
          icon: HiSparkles,
          title: locale === 'fr' ? 'Nettoyage et Préparation de Surface' : 'Surface Cleaning & Preparation',
          description: locale === 'fr'
            ? 'Nettoyage en profondeur et ponçage pour préparer les surfaces en bois pour l\'application de produits. Nous sommes capables de seulement nettoyer votre terrasse OU pousser le service plus loin pour appliquer teinture/scellant.'
            : 'Deep cleaning & sanding to prepare the wood surfaces for product application. We are able to just clean your decking OR take the service further to apply stain/seal.',
          features: locale === 'fr'
            ? ['Lavage complet de surface', 'Produits de qualité industrielle de haute qualité', 'Ponçage professionnel et préparation minutieuse']
            : ['Complete surface washing', 'High quality industry grade products', 'Professional sanding and thorough preparation']
        },
        {
          icon: HiHomeModern,
          title: locale === 'fr' ? 'Teinture et Scellage' : 'Staining & Sealing',
          description: locale === 'fr'
            ? 'Application de niveau de restauration complète de produits de qualité industrielle de haute qualité pour protéger votre terrasse des éléments et restaurer l\'apparence des surfaces.'
            : 'Full restoration level application of high quality industry grade products to protect your deck from the elements and restore the appearance of the surfaces.',
          features: locale === 'fr'
            ? ['Teintures et scellants premium', 'Finition protectrice durable', 'Attention de qualité aux détails']
            : ['Premium stains & seals', 'Long-lasting protective finish', 'Quality attention to detail']
        }
      ]
    }
  };

  const service = services[serviceKey];

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/30 text-[var(--primary)] dark:text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm border border-[var(--primary)] dark:border-[var(--primary)]/30">
          <HiSparkles className="w-4 h-4" />
          <span>{service.subtitle}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-muted)] dark:text-[var(--foreground)] mb-4">
          {service.title}
        </h1>
        <p className="text-lg text-[var(--text-muted)] dark:text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {service.services.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 hover:shadow-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/40 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Icon className="w-6 h-6 text-[var(--primary)] dark:text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-muted)] dark:text-[var(--foreground)] mb-3">{item.title}</h3>
              <p className="text-[var(--text-muted)] dark:text-[var(--text-muted)] mb-4">
                {item.description}
              </p>
              <ul className="space-y-2">
                {item.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)]">
                    <HiCheckCircle className="w-4 h-4 text-[var(--primary)] dark:text-[var(--primary)] mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded-xl p-6 text-center text-[var(--foreground)] mt-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          {locale === 'fr' ? 'Prêt à commencer?' : 'Ready to get started?'}
        </h3>
        <p className="text-[var(--text-muted)] mb-4">
          {locale === 'fr' ? 'Contactez-nous pour un devis gratuit' : 'Contact us for a free quote'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="tel:+15145551234"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-[var(--foreground)] px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {locale === 'fr' ? 'Appelez maintenant' : 'Call Now'}
          </a>
          <a
            href="mailto:info@edmtl.com"
            className="border border-[var(--primary)] text-[var(--primary)] hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-[var(--foreground)] px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
          >
            {locale === 'fr' ? 'Devis gratuit' : 'Free Quote'}
          </a>
        </div>
      </div>
    </div>
  );
}
