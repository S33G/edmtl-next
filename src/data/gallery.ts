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
    id: 'gutter-before-after', service: 'gutter-cleaning',
    src: '/images/services/guttercleaningbeforeafter1.png', comparison: true,
    en: { alt: 'The same gutter before cleaning on the left and after debris removal on the right.', caption: 'Gutter cleaning: before and after' },
    fr: { alt: 'La même gouttière avant le nettoyage à gauche et après le retrait des débris à droite.', caption: 'Nettoyage de gouttière : avant et après' },
  },
  {
    id: 'window-frame-before-after', service: 'window-cleaning',
    src: '/images/services/windowcleaningexternalframe1.png', comparison: true,
    en: { alt: 'Exterior window frame before cleaning on the left and after cleaning on the right.', caption: 'Exterior window frame: before and after' },
    fr: { alt: 'Un cadre de fenêtre extérieur avant le nettoyage à gauche et après le nettoyage à droite.', caption: 'Cadre de fenêtre extérieur : avant et après' },
  },
  {
    id: 'window-track-before-after', service: 'window-cleaning',
    src: '/images/services/windowcleaninginteriortrack1.png', comparison: true,
    en: { alt: 'Window track before cleaning on the left and after cleaning on the right.', caption: 'Window track: before and after' },
    fr: { alt: 'Un rail de fenêtre avant le nettoyage à gauche et après le nettoyage à droite.', caption: 'Rail de fenêtre : avant et après' },
  },
  {
    id: 'pressure-washing', service: 'pressure-washing',
    src: '/images/services/pressure-washing.png', comparison: false,
    en: { alt: 'A technician pressure washing a wood deck at a residential property.', caption: 'Pressure washing in progress' },
    fr: { alt: 'Un technicien lavant à pression une terrasse en bois sur une propriété résidentielle.', caption: 'Lavage à pression en cours' },
  },
  {
    id: 'siding-washing-before-after', service: 'pressure-washing',
    src: '/images/services/pressurewashingsiding1.png', comparison: true,
    en: { alt: 'House siding before washing on the left and after washing on the right.', caption: 'Exterior siding: before and after' },
    fr: { alt: 'Un revêtement extérieur avant le lavage à gauche et après le lavage à droite.', caption: 'Revêtement extérieur : avant et après' },
  },
  {
    id: 'composite-cleaning-before-after', service: 'pressure-washing',
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
