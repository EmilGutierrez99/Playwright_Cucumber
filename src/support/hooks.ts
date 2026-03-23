import {
  Before, After, BeforeAll, AfterAll,
  Status, setDefaultTimeout
} from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from './world';
import { loadTestConfig } from '../../config/test.config';

const config = loadTestConfig();

setDefaultTimeout(config.defaultTimeout);

let browser: Browser;

// ── Una sola instancia del navegador para toda la suite ────────
BeforeAll(async () => {
  // Crear directorio de screenshots si no existe
  const screenshotDir = path.resolve(config.screenshotsDir);
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    browser = await chromium.launch({
      headless: config.headless,
      slowMo: config.slowMo,
    });
  } catch (error) {
    console.error('\n══════════════════════════════════════════════════════════');
    console.error('  ERROR: No se pudo abrir el navegador.');
    console.error('  Ejecuta: npx playwright install chromium');
    console.error('══════════════════════════════════════════════════════════\n');
    throw error;
  }
});

// ── Contexto nuevo por escenario (aislamiento) ─────────────────
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: 'es-ES',
    ignoreHTTPSErrors: true,
  });

  this.page = await this.context.newPage();

  // Timeouts a nivel de página (sin waitForTimeout)
  this.page.setDefaultTimeout(config.defaultTimeout);
  this.page.setDefaultNavigationTimeout(config.navigationTimeout);
});

// ── Limpieza y capturas post-escenario ──────────────────────────
After(async function (this: CustomWorld, scenario) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

  // Screenshot automático en caso de fallo
  if (scenario.result?.status === Status.FAILED && config.screenshotsOnFailure) {
    try {
      const screenshot = await this.page.screenshot({ fullPage: true });
      this.attach(screenshot, 'image/png');

      // Guardar también en disco para referencia rápida
      const filePath = path.resolve(
        config.screenshotsDir,
        `FAIL_${this.siteName}_${scenarioName}_${Date.now()}.png`
      );
      fs.writeFileSync(filePath, screenshot);
    } catch {
      // Si el screenshot falla (por ejemplo, página cerrada), no bloquear el flujo
    }
  }

  // Captura de página completa si el escenario lo solicitó
  if (this.captureFullPage && scenario.result?.status === Status.PASSED) {
    try {
      // Scroll hasta el final para activar lazy loading
      await autoScroll(this);

      // Volver arriba antes de capturar
      await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

      // Esperar a que el DOM se estabilice tras el scroll
      await this.page.waitForLoadState('networkidle').catch(() => {});

      const screenshot = await this.page.screenshot({ fullPage: true });
      this.attach(screenshot, 'image/png');
    } catch {
      // No bloquear si la captura falla
    }
  }

  await this.page.close();
  await this.context.close();
});

AfterAll(async () => {
  await browser?.close();
});

// ── Utilidad: scroll progresivo para lazy loading ───────────────
async function autoScroll(world: CustomWorld): Promise<void> {
  await world.page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
}
