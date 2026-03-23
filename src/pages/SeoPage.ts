import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SeoPage — validaciones de SEO on-page para WordPress.
 *
 * Verifica meta tags generados por Yoast SEO, Rank Math, All in One SEO, etc.
 */
export class SeoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Verifica que el <title> coincida con el patrón esperado */
  async assertTitle(expected: string | RegExp): Promise<void> {
    if (typeof expected === 'string') {
      await expect(this.page).toHaveTitle(expected);
    } else {
      await expect(this.page).toHaveTitle(expected);
    }
  }

  /** Verifica la meta description */
  async assertMetaDescription(expected: string | RegExp): Promise<void> {
    const content = await this.getMetaContent('description');
    if (!content) throw new Error('Meta description no encontrada');

    if (typeof expected === 'string') {
      expect(content).toContain(expected);
    } else {
      expect(content).toMatch(expected);
    }
  }

  /** Verifica Open Graph title */
  async assertOgTitle(expected: string | RegExp): Promise<void> {
    const content = await this.getMetaContent('og:title');
    if (!content) throw new Error('og:title no encontrada');

    if (typeof expected === 'string') {
      expect(content).toContain(expected);
    } else {
      expect(content).toMatch(expected);
    }
  }

  /** Verifica que exista og:image */
  async assertOgImageExists(): Promise<void> {
    const content = await this.getMetaContent('og:image');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  }

  /** Verifica el link canonical */
  async assertCanonical(expected: string | RegExp): Promise<void> {
    const href = await this.getCanonical();
    if (!href) throw new Error('Link canonical no encontrado');

    if (typeof expected === 'string') {
      expect(href).toContain(expected);
    } else {
      expect(href).toMatch(expected);
    }
  }

  /** Verifica que solo exista un <h1> en la página */
  async assertSingleH1(): Promise<void> {
    const count = await this.page.locator('h1').count();
    expect(count).toBe(1);
  }

  /** Verifica que todas las imágenes tengan alt text */
  async assertImagesHaveAlt(): Promise<{ total: number; withoutAlt: number }> {
    const result = await this.page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const withoutAlt = images.filter(
        (img) => !img.getAttribute('alt') || img.getAttribute('alt')!.trim() === ''
      );
      return { total: images.length, withoutAlt: withoutAlt.length };
    });
    return result;
  }
}
