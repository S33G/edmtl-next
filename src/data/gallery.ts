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
  {"id": "sept-gutters3", "service": "gutter-cleaning", src: '/images/projects/sept-2026/gutters3.webp', "comparison": true, "en": {"alt": "A roof-edge gutter before cleaning on the left and after cleaning on the right.", "caption": "A roof-edge gutter before cleaning on the left and after cleaning on the right."}, "fr": {"alt": "Une gouttière au bord du toit avant le nettoyage à gauche et après à droite.", "caption": "Une gouttière au bord du toit avant le nettoyage à gauche et après à droite."}},
  {"id": "sept-gutters4", "service": "gutter-cleaning", src: '/images/projects/sept-2026/gutters4.webp', "comparison": true, "en": {"alt": "Plants and debris in a gutter on the left, with the cleared gutter on the right.", "caption": "Plants and debris in a gutter on the left, with the cleared gutter on the right."}, "fr": {"alt": "Des plantes et des débris dans une gouttière à gauche, puis la gouttière dégagée à droite.", "caption": "Des plantes et des débris dans une gouttière à gauche, puis la gouttière dégagée à droite."}},
  {"id": "sept-gutter-team", "service": "gutter-cleaning", src: '/images/projects/sept-2026/gutter-team.webp', "comparison": false, "en": {"alt": "An EDMTL team member working from a ladder at the roofline of a home.", "caption": "An EDMTL team member working from a ladder at the roofline of a home."}, "fr": {"alt": "Un membre de l’équipe EDMTL au travail sur une échelle, au bord du toit d’une maison.", "caption": "Un membre de l’équipe EDMTL au travail sur une échelle, au bord du toit d’une maison."}},
  {"id": "sept-windows1", "service": "window-cleaning", src: '/images/projects/sept-2026/windows1.webp', "comparison": true, "en": {"alt": "Window track and frame before cleaning on the left and after cleaning on the right.", "caption": "Window track and frame before cleaning on the left and after cleaning on the right."}, "fr": {"alt": "Un rail et un cadre de fenêtre avant le nettoyage à gauche et après à droite.", "caption": "Un rail et un cadre de fenêtre avant le nettoyage à gauche et après à droite."}},
  {"id": "sept-windows2", "service": "window-cleaning", src: '/images/projects/sept-2026/windows2.webp', "comparison": true, "en": {"alt": "An open window frame before cleaning on the left and after cleaning on the right.", "caption": "An open window frame before cleaning on the left and after cleaning on the right."}, "fr": {"alt": "Le cadre d’une fenêtre ouverte avant le nettoyage à gauche et après à droite.", "caption": "Le cadre d’une fenêtre ouverte avant le nettoyage à gauche et après à droite."}},
  {"id": "sept-patio1", "service": "pressure-washing", src: '/images/projects/sept-2026/patio1.webp', "comparison": true, "en": {"alt": "Exterior steps and the front of a home before washing on the left and after washing on the right.", "caption": "Exterior steps and the front of a home before washing on the left and after washing on the right."}, "fr": {"alt": "Des marches extérieures et la façade d’une maison avant le lavage à gauche et après à droite.", "caption": "Des marches extérieures et la façade d’une maison avant le lavage à gauche et après à droite."}},
  {"id": "sept-pressure-deck", "service": "pressure-washing", src: '/images/projects/sept-2026/pressure-deck.webp', "comparison": false, "en": {"alt": "Close-up of an outdoor deck surface during pressure washing.", "caption": "Close-up of an outdoor deck surface during pressure washing."}, "fr": {"alt": "Gros plan d’une surface de terrasse pendant le lavage à pression.", "caption": "Gros plan d’une surface de terrasse pendant le lavage à pression."}},
  {"id": "sept-pressure-siding-team", "service": "pressure-washing", src: '/images/projects/sept-2026/pressure-siding-team.webp', "comparison": false, "en": {"alt": "An EDMTL team member cleaning the siding of a home from a ladder.", "caption": "An EDMTL team member cleaning the siding of a home from a ladder."}, "fr": {"alt": "Un membre de l’équipe EDMTL qui nettoie le revêtement d’une maison à partir d’une échelle.", "caption": "Un membre de l’équipe EDMTL qui nettoie le revêtement d’une maison à partir d’une échelle."}},
  {"id": "sept-decks1", "service": "deck-staining", src: '/images/projects/sept-2026/decks1.webp', "comparison": true, "en": {"alt": "A wood deck before preparation on the left and after deck care on the right.", "caption": "A wood deck before preparation on the left and after deck care on the right."}, "fr": {"alt": "Une terrasse en bois avant la préparation à gauche et après les travaux à droite.", "caption": "Une terrasse en bois avant la préparation à gauche et après les travaux à droite."}},
  {"id": "sept-deck-finished", "service": "deck-staining", src: '/images/projects/sept-2026/deck-finished.webp', "comparison": false, "en": {"alt": "A finished wood deck with sunlight falling across the boards.", "caption": "A finished wood deck with sunlight falling across the boards."}, "fr": {"alt": "Une terrasse en bois terminée, avec le soleil sur les planches.", "caption": "Une terrasse en bois terminée, avec le soleil sur les planches."}},
  {"id": "sept-patio2", "service": "polymeric-sand-replacement", src: '/images/projects/sept-2026/patio2.webp', "comparison": true, "en": {"alt": "Paver joints before restoration on the left and after restoration on the right.", "caption": "Paver joints before restoration on the left and after restoration on the right."}, "fr": {"alt": "Les joints d’un pavé uni avant la remise en état à gauche et après à droite.", "caption": "Les joints d’un pavé uni avant la remise en état à gauche et après à droite."}},
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
    src: '/images/projects/sept-2026/gutters1.webp', comparison: true,
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
    src: '/images/projects/sept-2026/windows3.webp', comparison: true,
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
    id: 'dryer-vent', service: 'dryer-vent-cleaning',
    src: '/images/services/dryerventcleaning1.png', comparison: false,
    en: { alt: 'Dryer vent cleaning equipment and extracted lint.', caption: 'Dryer vent cleaning' },
    fr: { alt: 'Équipement de nettoyage de conduit de sécheuse et charpie retirée.', caption: 'Nettoyage de conduit de sécheuse' },
  },
  {
    id: 'polymeric-sand', service: 'polymeric-sand-replacement',
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
];

export function getGallery(locale: Locale): GalleryPhoto[] {
  return photos.map(({ en, fr, ...photo }) => ({ ...photo, ...(locale === 'fr' ? fr : en) }));
}
