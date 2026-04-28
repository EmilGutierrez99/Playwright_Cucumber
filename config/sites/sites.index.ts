/**
 * sites.index.ts
 *
 * Registro central de sitios.
 * Para añadir un sitio nuevo:
 *   1. Crea  sites/<nombre>.site.ts  siguiendo el patrón existente.
 *   2. Importa la constante aquí y agrégala al objeto `sites`.
 *
 * El resto del código (tests, helpers, etc.) solo necesita importar
 * desde este fichero — nunca directamente desde los *.site.ts.
 *
 * Ejemplo de uso en un test:
 *   import { sites } from '../sites/sites.index';
 *   const cfg = sites['comandolibertad'];
 */

export type { SiteConfig, SitePage, SiteSection, NavItem, FormConfig, FormField, SeoConfig } from './types';

import { comandolibertad } from './comandolibertad.site';
import { sitiolocal }      from './sitiolocal.site';

import type { SiteConfig } from './types';

export const sites: Record<string, SiteConfig> = {
  comandolibertad,
  sitiolocal,
};

// ─────────────────────────────────────────────────
// Helper: obtener un sitio con error claro si no existe
// ─────────────────────────────────────────────────

export function getSite(name: string): SiteConfig {
  const site = sites[name];
  if (!site) {
    const available = Object.keys(sites).join(', ');
    throw new Error(
      `Sitio "${name}" no encontrado en el registro.\n` +
      `Sitios disponibles: ${available}`
    );
  }
  return site;
}
