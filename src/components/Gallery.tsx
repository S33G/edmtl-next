'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '../lib/i18n';
import type { GalleryPhoto } from '../data/gallery';
import ProjectImage from './ProjectImage';
import './Gallery.css';

interface GalleryProps {
  locale: Locale;
  photos: GalleryPhoto[];
  filters: { slug: string; label: string }[];
}

export default function Gallery({ locale, photos, filters }: GalleryProps) {
  const fr = locale === 'fr';
  const [filter, setFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const visiblePhotos = filter === 'all' ? photos : photos.filter((photo) => photo.service === filter);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActivePhoto(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!activePhoto) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activePhoto]);

  return (
    <div className="project-gallery">
      <div className="gallery-filters" role="group" aria-label={fr ? 'Filtrer les réalisations par service' : 'Filter projects by service'}>
        {[{ slug: 'all', label: fr ? 'Tout voir' : 'All projects' }, ...filters].map((item) => (
          <button key={item.slug} type="button" className="gallery-filter" aria-pressed={filter === item.slug} onClick={() => setFilter(item.slug)}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="gallery-count" role="status" aria-live="polite">
        {fr ? `${visiblePhotos.length} photo${visiblePhotos.length === 1 ? '' : 's'}` : `${visiblePhotos.length} photo${visiblePhotos.length === 1 ? '' : 's'}`}
      </p>
      <div className="gallery-grid">
        {visiblePhotos.map((photo) => (
          <figure className="gallery-card" key={photo.id}>
            <button
              type="button"
              className={`gallery-image-button${photo.comparison ? ' gallery-comparison' : ''}`}
              aria-label={`${fr ? 'Agrandir la photo' : 'Enlarge photo'}: ${photo.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => { openerRef.current = event.currentTarget; setActivePhoto(photo); }}
            >
              <ProjectImage src={photo.src} alt={photo.alt} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <span className="gallery-enlarge" aria-hidden="true">↗</span>
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      {visiblePhotos.length === 0 && <p>{fr ? 'Aucune photo disponible pour ce service pour le moment.' : 'No photos are available for this service yet.'}</p>}
      <dialog
        className="gallery-dialog"
        ref={dialogRef}
        aria-labelledby="gallery-photo-caption"
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={(event) => {
          // The close control is the only focusable item; keep Tab within the modal.
          if (event.key === 'Tab') { event.preventDefault(); closeRef.current?.focus(); }
        }}
      >
        {activePhoto && (
          <div className="gallery-dialog-content">
            <button ref={closeRef} className="gallery-close" type="button" onClick={close} aria-label={fr ? 'Fermer la photo agrandie' : 'Close enlarged photo'}>
              <span aria-hidden="true">×</span> {fr ? 'Fermer' : 'Close'}
            </button>
            <div className="gallery-dialog-image">
              <ProjectImage src={activePhoto.src} alt={activePhoto.alt} sizes="95vw" />
            </div>
            <p id="gallery-photo-caption">{activePhoto.caption}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
