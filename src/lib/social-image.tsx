/* ImageResponse renders image markup directly; next/image is not supported here. */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Locale } from './i18n';
import { Service } from './services';

export function socialImage(locale: Locale, service?: Service) {
  const imagePath = service?.hero ?? '/images/frontpagesplash.png';
  const mime = /\.jpe?g$/i.test(imagePath) ? 'jpeg' : 'png';
  const photo = `data:image/${mime};base64,${readFileSync(path.join(process.cwd(), 'public', imagePath)).toString('base64')}`;
  const logo = `data:image/png;base64,${readFileSync(path.join(process.cwd(), 'public/images/edm-box-logo.png')).toString('base64')}`;
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: '#F9F6F0', color: '#1C1814' }}><div style={{ display: 'flex', flexDirection: 'column', padding: 55, width: '58%', justifyContent: 'space-between' }}><div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><img src={logo} width={65} height={65} alt="" /><span style={{ fontSize: 36, fontWeight: 700 }}>EDMTL.</span></div><div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}><div style={{ fontSize: 48, lineHeight: 1.1 }}>{service?.title ?? (locale === 'en' ? 'Care for your home. Montréal.' : 'Prendre soin de votre maison. Montréal.')}</div><div style={{ fontSize: 24, color: '#4A4238' }}>{locale === 'en' ? 'Owner-operated. Fully insured.' : 'Propriétaires sur le terrain. Entièrement assurés.'}</div></div><div style={{ display: 'flex', padding: '16px 24px', background: '#C49A1A', fontSize: 22, alignSelf: 'flex-start' }}>{locale === 'en' ? 'Free quotes · edmtl.com' : 'Soumissions gratuites · edmtl.com'}</div></div><img src={photo} alt="" width={504} height={630} style={{ objectFit: 'cover' }} /></div>, { width: 1200, height: 630 });
}
