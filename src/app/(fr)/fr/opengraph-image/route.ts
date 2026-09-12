import { socialImage } from '@/lib/social-image';
export const dynamic = 'force-static';
export function GET() { return socialImage('fr'); }
