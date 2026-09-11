import type { Locale } from '../lib/i18n';

export interface GalleryPhoto {
  id: string;
  service: string;
  src: string;
  alt: string;
  caption: string;
  comparison: boolean;
}

type LocalizedPhoto = Omit<GalleryPhoto, 'alt' | 'caption'> & {
  en: { alt: string; caption: string };
  fr: { alt: string; caption: string };
};

const photos: LocalizedPhoto[] = [
  {
    id: 'gutter-cleaning', service: 'gutter-cleaning',
    src: '/images/services/gutter-cleaning.png', comparison: false,
    en: { alt: 'A technician removing debris from a gutter at a residential property.', caption: 'Gutter cleaning in progress' },
    fr: { alt: 'Un technicien retirant des débris d’une gouttière sur une propriété résidentielle.', caption: 'Nettoyage de gouttières en cours' },
  },
  {
    id: 'window-cleaning', service: 'window-cleaning',
    src: '/images/services/exterior-window-cleaning.png', comparison: false,
    en: { alt: 'A ladder leading to a residential window surrounded by greenery.', caption: 'Residential window cleaning' },
    fr: { alt: 'Une échelle menant à une fenêtre résidentielle entourée de verdure.', caption: 'Lavage de vitres résidentiel' },
  },
  {
    id: 'pressure-washing', service: 'pressure-washing',
    src: '/images/services/pressure-washing.png', comparison: false,
    en: { alt: 'A technician pressure washing a wood deck at a residential property.', caption: 'Pressure washing in progress' },
    fr: { alt: 'Un technicien lavant à pression une terrasse en bois sur une propriété résidentielle.', caption: 'Lavage à pression en cours' },
  },
  {
    id: 'deck-staining', service: 'deck-staining',
    src: '/images/services/deckstaining1.png', comparison: false,
    en: { alt: 'A wood deck beside a house with a garden beyond the railing.', caption: 'Wood deck care — project photo' },
    fr: { alt: 'Une terrasse en bois près d’une maison et un jardin au-delà de la rampe.', caption: 'Entretien de terrasse en bois — photo de réalisation' },
  },
];

export function getGallery(locale: Locale): GalleryPhoto[] {
  return photos.map(({ en, fr, ...photo }) => ({ ...photo, ...(locale === 'fr' ? fr : en) }));
}
