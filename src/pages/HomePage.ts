import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage — interacciones específicas de la página de inicio de WordPress.
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Obtiene una sección por su selector qa-ticbo completo */
  section(qaSelector: string): Locator {
    return this.page.locator(qaSelector).first();
  }

  /** Verifica que una sección sea visible y retorna su locator */
  async assertSectionVisible(qaSelector: string): Promise<Locator> {
    const locator = this.section(qaSelector);
    await this.assertVisible(locator);
    return locator;
  }

  /** Cuenta cuántas secciones qa-ticbo tiene la página */
  async countQaSections(prefix: string): Promise<number> {
    return await this.page.locator(`[qa-ticbo^="${prefix}"]`).count();
  }
}
