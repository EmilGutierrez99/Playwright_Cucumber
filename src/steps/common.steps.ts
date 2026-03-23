import { Given, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { BasePage } from '../pages/BasePage';

// ─── NAVEGACIÓN GENÉRICA ────────────────────────

Given(
  'que el usuario visita la página {string}',
  async function (this: CustomWorld, pageKey: string) {
    const url = this.pageUrl(pageKey);
    const basePage = new BasePage(this.page);
    await basePage.navigate(url);
  }
);

Given(
  'que el usuario visita la URL {string}',
  async function (this: CustomWorld, path: string) {
    const url = `${this.siteConfig.baseUrl}${path}`;
    const basePage = new BasePage(this.page);
    await basePage.navigate(url);
  }
);

// ─── CAPTURAS ───────────────────────────────────

Then(
  'activar captura de página completa',
  async function (this: CustomWorld) {
    this.captureFullPage = true;
  }
);

Then(
  'capturar la sección {string} de la página {string}',
  async function (this: CustomWorld, sectionKey: string, pageKey: string) {
    const selector = this.buildSelector(sectionKey, pageKey);
    const basePage = new BasePage(this.page);
    const locator = basePage.locate(selector);
    const screenshot = await basePage.screenshotElement(locator);
    this.attach(screenshot, 'image/png');
  }
);
