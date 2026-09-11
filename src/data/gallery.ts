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
    src: '/images/services/guttercleaningbeforeafter1.png', comparison: true,
    en: { alt: 'The same gutter before cleaning on the left and after debris removal on the right.', caption: 'Gutter cleaning: before and after' },
    fr: { alt: 'La même gouttière avant le nettoyage à gauche et après le retrait des débris à droite.', caption: 'Nettoyage de gouttière : avant et après' },
  },
  {
    id: 'window-frame', service: 'window-cleaning',
    src: '/images/services/windowcleaningexternalframe1.png', comparison: true,
    en: { alt: 'Exterior window frame before cleaning on the left and after cleaning on the right.', caption: 'Exterior window frame: before and after' },
    fr: { alt: 'Un cadre de fenêtre extérieur avant le nettoyage à gauche et après le nettoyage à droite.', caption: 'Cadre de fenêtre extérieur : avant et après' },
  },
  {
    id: 'window-track', service: 'window-cleaning',
    src: '/images/services/windowcleaninginteriortrack1.png', comparison: true,
    en: { alt: 'Window track before cleaning on the left and after cleaning on the right.', caption: 'Window track: before and after' },
    fr: { alt: 'Un rail de fenêtre avant le nettoyage à gauche et après le nettoyage à droite.', caption: 'Rail de fenêtre : avant et après' },
  },
  {
    id: 'siding-washing', service: 'pressure-washing',
    src: '/images/services/pressurewashingsiding1.png', comparison: true,
    en: { alt: 'House siding before washing on the left and after washing on the right.', caption: 'Exterior siding: before and after' },
    fr: { alt: 'Un revêtement extérieur avant le lavage à gauche et après le lavage à droite.', caption: 'Revêtement extérieur : avant et après' },
  },
  {
    id: 'composite-cleaning', service: 'pressure-washing',
    src: '/images/services/pressurewashingcomposite1.png', comparison: true,
    en: { alt: 'Composite decking before cleaning on the left and after cleaning on the right.', caption: 'Composite deck cleaning: before and after' },
    fr: { alt: 'Une terrasse en composite avant le nettoyage à gauche et après le nettoyage à droite.', caption: 'Nettoyage de terrasse en composite : avant et après' },
  },
  {
    id: 'polymeric-sand', service: 'pressure-washing',
    src: '/images/services/polymericsand1.png', comparison: false,
    en: { alt: 'A paved driveway with sand joints in front of a home.', caption: 'Polymeric sand — project photo' },
    fr: { alt: 'Une entrée pavée avec des joints de sable devant une maison.', caption: 'Sable polymère — photo de réalisation' },
  },
  {
    id: 'deck-staining', service: 'deck-staining',
    src: '/images/services/deckstaining1.png', comparison: false,
    en: { alt: 'A wood deck beside a house with a garden beyond the railing.', caption: 'Wood deck care — project photo' },
    fr: { alt: 'Une terrasse en bois près d’une maison et un jardin au-delà de la rampe.', caption: 'Entretien de terrasse en bois — photo de réalisation' },
  },
  {
    id: 'deck-preparation', service: 'deck-staining',
    src: '/images/services/surface-cleaning-and-preparation.png', comparison: false,
    en: { alt: 'A wood deck surface illustrating preparation for deck care.', caption: 'Deck surface preparation — project photo' },
    fr: { alt: 'Une surface de terrasse en bois illustrant la préparation avant l’entretien.', caption: 'Préparation de terrasse — photo de réalisation' },
  },
];

export function getGallery(locale: Locale): GalleryPhoto[] {
  return photos.map(({ en, fr, ...photo }) => ({ ...photo, ...(locale === 'fr' ? fr : en) }));
}
