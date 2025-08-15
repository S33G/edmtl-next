export interface ServiceMetadataItem {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  alternateUrls: {
    en: string;
    fr: string;
  };
}

export interface ServiceMetadata {
  en: ServiceMetadataItem;
  fr: ServiceMetadataItem;
}

export const serviceMetadata = {
  'window-cleaning': {
    en: {
      title: 'Professional Window Cleaning Montreal | Crystal Clear Results | EDM',
      description: 'Expert window cleaning services in Montreal. Interior & exterior cleaning, streak-free results. Fully insured professionals. Call (438) 500-3099 for free quote.',
      keywords: [
        'window cleaning Montreal',
        'professional window cleaning',
        'residential window cleaning',
        'commercial window cleaning',
        'streak-free windows',
        'Montreal cleaning services',
        'exterior window cleaning',
        'interior window cleaning',
        'window washing Montreal',
        'glass cleaning services'
      ],
      canonical: '/services/window-cleaning',
      alternateUrls: {
        en: '/services/window-cleaning',
        fr: '/fr/services/window-cleaning'
      }
    },
    fr: {
      title: 'Nettoyage de Vitres Professionnel Montréal | Résultats Parfaits | EDM',
      description: 'Services experts de nettoyage de vitres à Montréal. Nettoyage intérieur et extérieur, résultats sans traces. Professionnels assurés. Appelez (438) 500-3099.',
      keywords: [
        'nettoyage vitres Montréal',
        'nettoyage fenêtres professionnel',
        'nettoyage vitres résidentiel',
        'nettoyage vitres commercial',
        'vitres sans traces',
        'services nettoyage Montréal',
        'nettoyage vitres extérieur',
        'nettoyage vitres intérieur',
        'lavage fenêtres Montréal',
        'services nettoyage verre'
      ],
      canonical: '/fr/services/window-cleaning',
      alternateUrls: {
        en: '/services/window-cleaning',
        fr: '/fr/services/window-cleaning'
      }
    }
  },
  'gutter-services': {
    en: {
      title: 'Professional Gutter Cleaning Montreal | Maintenance & Repair | EDM',
      description: 'Expert gutter cleaning and maintenance in Montreal. Prevent water damage with professional gutter services. Fully insured. Call (438) 500-3099 for free quote.',
      keywords: [
        'gutter cleaning Montreal',
        'gutter maintenance',
        'gutter repair Montreal',
        'eavestrough cleaning',
        'professional gutter services',
        'Montreal home maintenance',
        'gutter protection',
        'water damage prevention',
        'seasonal gutter cleaning',
        'residential gutter cleaning'
      ],
      canonical: '/services/gutter-services',
      alternateUrls: {
        en: '/services/gutter-services',
        fr: '/fr/services/gutter-services'
      }
    },
    fr: {
      title: 'Nettoyage Gouttières Professionnel Montréal | Entretien & Réparation | EDM',
      description: 'Services experts de nettoyage et entretien de gouttières à Montréal. Prévenez les dégâts d\'eau avec nos services professionnels. Appelez (438) 500-3099.',
      keywords: [
        'nettoyage gouttières Montréal',
        'entretien gouttières',
        'réparation gouttières Montréal',
        'nettoyage chéneaux',
        'services gouttières professionnels',
        'entretien maison Montréal',
        'protection gouttières',
        'prévention dégâts eau',
        'nettoyage saisonnier gouttières',
        'nettoyage gouttières résidentiel'
      ],
      canonical: '/fr/services/gutter-services',
      alternateUrls: {
        en: '/services/gutter-services',
        fr: '/fr/services/gutter-services'
      }
    }
  },
  'pressure-washing': {
    en: {
      title: 'Professional Pressure Washing Montreal | Exterior Cleaning | EDM',
      description: 'Expert pressure washing services in Montreal. Driveways, decks, siding, patios. Eco-friendly high-pressure cleaning. Call (438) 500-3099 for free quote.',
      keywords: [
        'pressure washing Montreal',
        'power washing services',
        'driveway cleaning Montreal',
        'deck pressure washing',
        'siding cleaning',
        'patio cleaning',
        'exterior house washing',
        'high pressure cleaning',
        'professional washing services',
        'Montreal cleaning company'
      ],
      canonical: '/services/pressure-washing',
      alternateUrls: {
        en: '/services/pressure-washing',
        fr: '/fr/services/pressure-washing'
      }
    },
    fr: {
      title: 'Lavage à Pression Professionnel Montréal | Nettoyage Extérieur | EDM',
      description: 'Services experts de lavage à pression à Montréal. Entrées, terrasses, revêtements, patios. Nettoyage haute pression écologique. Appelez (438) 500-3099.',
      keywords: [
        'lavage pression Montréal',
        'services nettoyage haute pression',
        'nettoyage entrée Montréal',
        'lavage terrasse pression',
        'nettoyage revêtement',
        'nettoyage patio',
        'lavage extérieur maison',
        'nettoyage haute pression',
        'services lavage professionnels',
        'compagnie nettoyage Montréal'
      ],
      canonical: '/fr/services/pressure-washing',
      alternateUrls: {
        en: '/services/pressure-washing',
        fr: '/fr/services/pressure-washing'
      }
    }
  },
  'deck-refinishing': {
    en: {
      title: 'Professional Deck Refinishing Montreal | Wood Restoration | EDM',
      description: 'Expert deck refinishing and restoration in Montreal. Staining, sealing, and wood deck repair services. Extend your deck life. Call (438) 500-3099 for free quote.',
      keywords: [
        'deck refinishing Montreal',
        'deck restoration',
        'wood deck staining',
        'deck sealing Montreal',
        'deck repair services',
        'professional deck refinishing',
        'Montreal deck services',
        'wood deck maintenance',
        'deck cleaning and staining',
        'outdoor deck restoration'
      ],
      canonical: '/services/deck-refinishing',
      alternateUrls: {
        en: '/services/deck-refinishing',
        fr: '/fr/services/deck-refinishing'
      }
    },
    fr: {
      title: 'Rénovation Terrasse Professionnelle Montréal | Restauration Bois | EDM',
      description: 'Services experts de rénovation et restauration de terrasses à Montréal. Teinture, scellant, réparation terrasse bois. Appelez (438) 500-3099.',
      keywords: [
        'rénovation terrasse Montréal',
        'restauration terrasse',
        'teinture terrasse bois',
        'scellant terrasse Montréal',
        'réparation terrasse services',
        'rénovation terrasse professionnelle',
        'services terrasse Montréal',
        'entretien terrasse bois',
        'nettoyage teinture terrasse',
        'restauration terrasse extérieure'
      ],
      canonical: '/fr/services/deck-refinishing',
      alternateUrls: {
        en: '/services/deck-refinishing',
        fr: '/fr/services/deck-refinishing'
      }
    }
  }
};

export function getServiceMetadata(service: string, locale: string): ServiceMetadataItem {
  const serviceData = serviceMetadata[service as keyof typeof serviceMetadata];
  if (!serviceData) {
    throw new Error(`Service metadata not found for: ${service}`);
  }
  
  return serviceData[locale as keyof typeof serviceData] || serviceData.en;
}
