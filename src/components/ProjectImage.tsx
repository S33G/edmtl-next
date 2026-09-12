import manifest from '@/data/image-manifest.json';

type ImageEntry = { width: number; height: number; variants: { src: string; width: number; height: number }[] };

export default function ProjectImage({ src, alt, className, priority = false, sizes = '(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw' }: {
  src: string; alt: string; className?: string; priority?: boolean; sizes?: string;
}) {
  const entry = (manifest as Record<string, ImageEntry>)[src];
  const variants = entry?.variants ?? [];
  const standard = variants.find(image => image.width >= 800) ?? variants.at(-1);
  // These images have build-time responsive derivatives; no image server is needed.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={standard?.src ?? src} srcSet={variants.length ? variants.map(image => `${image.src} ${image.width}w`).join(', ') : undefined} sizes={sizes} alt={alt} width={entry?.width ?? 1200} height={entry?.height ?? 800} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={className} />;
}
