import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { NavigationPage } from '../pages/NavigationPage';

// ─── MENÚ PRINCIPAL ─────────────────────────────

Then(
  'el menú contiene el enlace {string}',
  async function (this: CustomWorld, label: string) {
    const navPage = new NavigationPage(this.page);
    const link = navPage.menuLink(label);
    await navPage.assertVisible(link);
  }
);

When(
  'el usuario hace clic en el enlace del menú {string}',
  async function (this: CustomWorld, label: string) {
    const navPage = new NavigationPage(this.page);
    const link = navPage.menuLink(label);
    await navPage.clickMenuAndWait(link);
  }
);

Then(
  'la URL contiene {string}',
  async function (this: CustomWorld, expectedPath: string) {
    const navPage = new NavigationPage(this.page);
    await navPage.assertCurrentPath(expectedPath);
  }
);

// ─── BREADCRUMBS ────────────────────────────────

Then(
  'el breadcrumb es visible',
  async function (this: CustomWorld) {
    const navPage = new NavigationPage(this.page);
    await navPage.assertBreadcrumbExists();
  }
);

// ─── ENLACES INTERNOS ───────────────────────────

Then(
  'la página tiene enlaces internos',
  async function (this: CustomWorld) {
    const navPage = new NavigationPage(this.page);
    const links = await navPage.getInternalLinks();
    if (links.length === 0) {
      throw new Error('No se encontraron enlaces internos en la página');
    }
  }
);

// ─── NAVEGACIÓN DESDE CONFIG ────────────────────

Then(
  'todos los enlaces del menú principal son accesibles',
  async function (this: CustomWorld) {
    const navItems = this.siteConfig.navigation;
    if (!navItems || navItems.length === 0) {
      throw new Error(`No hay navegación configurada para sitio "${this.siteName}"`);
    }

    const navPage = new NavigationPage(this.page);

    for (const item of navItems) {
      const link = item.selector
        ? navPage.menuLinkBySelector(item.selector)
        : navPage.menuLink(item.label);

      await navPage.assertVisible(link);
    }
  }
);
