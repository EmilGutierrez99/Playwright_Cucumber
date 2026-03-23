import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — clase base para todos los Page Objects.
 *
 * Encapsula patrones comunes de WordPress:
 * - Esperar carga completa
 * - Localizar por qa-ticbo
 * - Manejar lazy loading
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navega a una URL y espera a que el DOM esté listo.
   * Usa 'domcontentloaded' porque muchos temas WP cargan
   * scripts pesados que retrasan 'load' innecesariamente.
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /** Localiza un elemento por su atributo qa-ticbo */
  locateByQa(qaValue: string): Locator {
    return this.page.locator(`[qa-ticbo="${qaValue}"]`).first();
  }

  /** Localiza por selector CSS estándar */
  locate(selector: string): Locator {
    return this.page.locator(selector).first();
  }

  /** Verifica que un elemento sea visible (con auto-wait de Playwright) */
  async assertVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /** Verifica que un elemento exista en el DOM */
  async assertExists(locator: Locator): Promise<void> {
    await expect(locator).toHaveCount(1);
  }

  /** Captura un screenshot de un elemento específico */
  async screenshotElement(locator: Locator): Promise<Buffer> {
    await locator.scrollIntoViewIfNeeded();
    // Esperar a que el elemento tenga dimensiones estables
    await locator.evaluate((el) => {
      return new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', () => resolve());
        }
      });
    });
    return await locator.screenshot();
  }

  /** Obtiene el título de la página */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /** Obtiene el contenido de una meta tag por nombre */
  async getMetaContent(name: string): Promise<string | null> {
    const meta = this.page.locator(`meta[name="${name}"], meta[property="${name}"]`).first();
    return await meta.getAttribute('content').catch(() => null);
  }

  /** Obtiene el href del link canonical */
  async getCanonical(): Promise<string | null> {
    const link = this.page.locator('link[rel="canonical"]').first();
    return await link.getAttribute('href').catch(() => null);
  }
}
