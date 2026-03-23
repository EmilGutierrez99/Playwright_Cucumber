/**
 * test.config.ts
 *
 * Lee variables de entorno y expone la configuración general de tests.
 */

import * as dotenv from 'dotenv';
import { sites, SiteConfig } from './sites.config';

dotenv.config();

export interface TestConfig {
  site: SiteConfig;
  siteName: string;
  headless: boolean;
  slowMo: number;
  defaultTimeout: number;
  navigationTimeout: number;
  screenshotsOnFailure: boolean;
  screenshotsDir: string;
}

export function loadTestConfig(siteOverride?: string): TestConfig {
  const siteName = siteOverride || process.env.SITE || 'comandolibertad';
  const site = sites[siteName];

  if (!site) {
    const available = Object.keys(sites).join(', ');
    throw new Error(
      `Sitio "${siteName}" no encontrado en sites.config.ts.\n` +
      `Sitios disponibles: ${available}`
    );
  }

  return {
    site,
    siteName,
    headless: process.env.HEADLESS !== 'false',
    slowMo: Number(process.env.SLOWMO) || 0,
    defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 30_000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 45_000,
    screenshotsOnFailure: process.env.SCREENSHOTS_ON_FAILURE !== 'false',
    screenshotsDir: process.env.SCREENSHOTS_DIR || 'reports/screenshots',
  };
}
