import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { SiteConfig } from '../../config/sites.config';
import { loadTestConfig } from '../../config/test.config';

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  siteConfig!: SiteConfig;
  siteName!: string;

  /** Flag para captura de pantalla completa al finalizar el escenario */
  captureFullPage = false;

  /** Almacena datos entre steps del mismo escenario */
  scenarioData: Record<string, unknown> = {};

  constructor(options: IWorldOptions) {
    super(options);

    // Permite override del sitio via --world-parameters '{"site":"otro"}'
    const siteOverride = (options.parameters as Record<string, string>)?.site;
    const config = loadTestConfig(siteOverride);

    this.siteConfig = config.site;
    this.siteName = config.siteName;
  }

  /**
   * Construye el selector qa-ticbo completo para una sección.
   *
   *   Global (header/footer) → [qa-ticbo="cmndlbrtd_header"]
   *   De página               → [qa-ticbo="cmndlbrtd_inicio_hero"]
   */
  buildSelector(sectionKey: string, pageKey: string): string {
    const page = this.siteConfig.pages[pageKey];
    if (!page) {
      throw new Error(`Página "${pageKey}" no definida para sitio "${this.siteName}"`);
    }

    const section = page.sections[sectionKey];
    if (!section) {
      throw new Error(
        `Sección "${sectionKey}" no definida en página "${pageKey}" del sitio "${this.siteName}"`
      );
    }

    const attr = section.global
      ? `${this.siteConfig.qaPrefix}_${section.qaAttr}`
      : `${this.siteConfig.qaPrefix}_${pageKey}_${section.qaAttr}`;

    return `[qa-ticbo="${attr}"]`;
  }

  /** URL completa de una página del sitio */
  pageUrl(pageKey: string): string {
    const page = this.siteConfig.pages[pageKey];
    if (!page) {
      throw new Error(`Página "${pageKey}" no definida para sitio "${this.siteName}"`);
    }
    return `${this.siteConfig.baseUrl}${page.path}`;
  }

  /** Espera un tiempo determinado en milisegundos */
  async wait(ms: number = 4000): Promise<void> {
  await this.page.waitForTimeout(ms);
  }
}

setWorldConstructor(CustomWorld);
