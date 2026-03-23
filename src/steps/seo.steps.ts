import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { SeoPage } from '../pages/SeoPage';

// ─── TITLE ──────────────────────────────────────

Then(
  'el título de la página contiene {string}',
  async function (this: CustomWorld, expected: string) {
    const seoPage = new SeoPage(this.page);
    await seoPage.assertTitle(new RegExp(expected, 'i'));
  }
);

// ─── META DESCRIPTION ───────────────────────────

Then(
  'la meta description contiene {string}',
  async function (this: CustomWorld, expected: string) {
    const seoPage = new SeoPage(this.page);
    await seoPage.assertMetaDescription(new RegExp(expected, 'i'));
  }
);

Then(
  'la meta description existe',
  async function (this: CustomWorld) {
    const seoPage = new SeoPage(this.page);
    const content = await seoPage.getMetaContent('description');
    if (!content || content.trim().length === 0) {
      throw new Error('Meta description no encontrada o vacía');
    }
  }
);

// ─── OPEN GRAPH ─────────────────────────────────

Then(
  'la página tiene og:title',
  async function (this: CustomWorld) {
    const seoPage = new SeoPage(this.page);
    const content = await seoPage.getMetaContent('og:title');
    if (!content) throw new Error('og:title no encontrada');
  }
);

Then(
  'la página tiene og:image',
  async function (this: CustomWorld) {
    const seoPage = new SeoPage(this.page);
    await seoPage.assertOgImageExists();
  }
);

// ─── CANONICAL ──────────────────────────────────

Then(
  'la página tiene un link canonical',
  async function (this: CustomWorld) {
    const seoPage = new SeoPage(this.page);
    const href = await seoPage.getCanonical();
    if (!href) throw new Error('Link canonical no encontrado');
  }
);

// ─── ESTRUCTURA ─────────────────────────────────

Then(
  'la página tiene un solo h1',
  async function (this: CustomWorld) {
    const seoPage = new SeoPage(this.page);
    await seoPage.assertSingleH1();
  }
);

Then(
  'las imágenes tienen atributo alt',
  async function (this: CustomWorld) {
    const seoPage = new SeoPage(this.page);
    const result = await seoPage.assertImagesHaveAlt();
    if (result.withoutAlt > 0) {
      throw new Error(
        `${result.withoutAlt} de ${result.total} imágenes no tienen atributo alt`
      );
    }
  }
);

// ─── VALIDACIÓN SEO DESDE CONFIG ────────────────

Then(
  'el SEO de la página {string} cumple la configuración',
  async function (this: CustomWorld, pageKey: string) {
    const seoConfig = this.siteConfig.seo?.[pageKey];
    if (!seoConfig) {
      throw new Error(`No hay configuración SEO para página "${pageKey}" en sitio "${this.siteName}"`);
    }

    const seoPage = new SeoPage(this.page);

    if (seoConfig.title) {
      await seoPage.assertTitle(seoConfig.title);
    }
    if (seoConfig.description) {
      await seoPage.assertMetaDescription(seoConfig.description);
    }
    if (seoConfig.ogTitle) {
      await seoPage.assertOgTitle(seoConfig.ogTitle);
    }
    if (seoConfig.ogImage) {
      await seoPage.assertOgImageExists();
    }
    if (seoConfig.canonical) {
      await seoPage.assertCanonical(seoConfig.canonical);
    }
  }
);
