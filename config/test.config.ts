/**
 * test.config.ts
 *
 * Lee variables de entorno y expone la configuración general de tests.
 */

import * as dotenv from 'dotenv';
import { sites, getSite, SiteConfig } from '../config/sites/sites.index';

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

  return {
    site:                 getSite(siteName), // lanza error claro si no existe
    siteName,
    headless:             process.env.HEADLESS !== 'false',
    slowMo:               Number(process.env.SLOWMO) || 0,
    defaultTimeout:       Number(process.env.DEFAULT_TIMEOUT) || 30_000,
    navigationTimeout:    Number(process.env.NAVIGATION_TIMEOUT) || 45_000,
    screenshotsOnFailure: process.env.SCREENSHOTS_ON_FAILURE !== 'false',
    screenshotsDir:       process.env.SCREENSHOTS_DIR || 'reports/screenshots',
  };
}