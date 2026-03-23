import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';

// ─── VERIFICACIÓN DE SECCIONES ──────────────────

Then(
  'la sección {string} de la página {string} es visible',
  async function (this: CustomWorld, sectionKey: string, pageKey: string) {
    const selector = this.buildSelector(sectionKey, pageKey);
    const homePage = new HomePage(this.page);
    await homePage.assertSectionVisible(selector);
  }
);

Then(
  'la sección {string} de la página {string} contiene texto',
  async function (this: CustomWorld, sectionKey: string, pageKey: string) {
    const selector = this.buildSelector(sectionKey, pageKey);
    const homePage = new HomePage(this.page);
    const locator = homePage.section(selector);
    const text = await locator.textContent();
    if (!text || text.trim().length === 0) {
      throw new Error(`La sección "${sectionKey}" está vacía`);
    }
  }
);

Then(
  'la página {string} tiene al menos {int} secciones qa-ticbo',
  async function (this: CustomWorld, pageKey: string, minCount: number) {
    const homePage = new HomePage(this.page);
    const count = await homePage.countQaSections(this.siteConfig.qaPrefix);
    if (count < minCount) {
      throw new Error(`Se esperaban >= ${minCount} secciones qa-ticbo, se encontraron ${count}`);
    }
  }
);
