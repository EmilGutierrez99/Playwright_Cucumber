import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * NavigationPage — tests de navegación, menús y enlaces.
 */
export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Localiza un enlace del menú principal por su texto */
  menuLink(label: string): Locator {
    // Busca primero en <nav>, luego fallback a cualquier enlace
    return this.page
      .locator('nav a, .menu a, .nav a, #menu a')
      .filter({ hasText: new RegExp(`^${label}$`, 'i') })
      .first();
  }

  /** Localiza un enlace por selector personalizado */
  menuLinkBySelector(selector: string): Locator {
    return this.page.locator(selector).first();
  }

  /** Hace clic en un enlace del menú y espera navegación */
  async clickMenuAndWait(locator: Locator): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      locator.click(),
    ]);
  }

  /** Verifica que la URL actual contenga el path esperado */
  async assertCurrentPath(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath.replace(/\//g, '\\/')));
  }

  /** Obtiene todos los enlaces internos rotos (status >= 400) */
  async getInternalLinks(): Promise<string[]> {
    return await this.page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      const origin = window.location.origin;
      return anchors
        .map((a) => a.getAttribute('href') || '')
        .filter((href) => href.startsWith('/') || href.startsWith(origin))
        .map((href) => href.startsWith('/') ? `${origin}${href}` : href);
    });
  }

  /** Verifica que exista un breadcrumb visible */
  async assertBreadcrumbExists(): Promise<void> {
    const breadcrumb = this.page.locator(
      '[class*="breadcrumb"], nav[aria-label="Breadcrumb"], .yoast-breadcrumbs, .rank-math-breadcrumb'
    ).first();
    await this.assertVisible(breadcrumb);
  }
}
