import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { FormPage } from '../pages/FormPage';
import { sites, getSite } from '../../config/sites/sites.index';// ajusta la ruta si es necesario

// ─── VISIBILIDAD ────────────────────────────────
Then(
  'el formulario {string} es visible',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const formPage = new FormPage(this.page);
    await formPage.assertFormVisible(formConfig.formSelector);
  }
);
// ─── NAVEGACIÓN A FORMULARIO ────────────────────
Given(
  'que el usuario visita el formulario {string}',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const formPage = new FormPage(this.page);
    await formPage.navigate(`${this.siteConfig.baseUrl}${formConfig.pagePath}`);
  }
);
// ─── LLENADO ────────────────────────────────────
When(
  'el usuario completa el formulario {string} con datos de prueba',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const formPage = new FormPage(this.page);
    await formPage.fillForm(formConfig);
  }
);
When(
  'el usuario completa el campo {string} del formulario {string} con {string}',
  async function (this: CustomWorld, fieldKey: string, formKey: string, value: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const field = formConfig.fields[fieldKey];
    if (!field) {
      throw new Error(`Campo "${fieldKey}" no configurado en formulario "${formKey}"`);
    }

    const formPage = new FormPage(this.page);
    await formPage.fillField(field.selector, value, field.type);
  }
);
// ─── ENVÍO ──────────────────────────────────────
When(
  'el usuario envía el formulario {string}',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const formPage = new FormPage(this.page);
    await formPage.submit(formConfig.submitSelector);
  }
);
// ─── VALIDACIONES ───────────────────────────────
Then(
  'el formulario {string} muestra mensaje de éxito',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const formPage = new FormPage(this.page);
    await formPage.waitForResponse(formConfig.successSelector);
  }
);
Then(
  'el campo {string} del formulario {string} muestra error de validación',
  async function (this: CustomWorld, fieldKey: string, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const field = formConfig.fields[fieldKey];
    if (!field) {
      throw new Error(`Campo "${fieldKey}" no configurado en formulario "${formKey}"`);
    }

    const formPage = new FormPage(this.page);
    const hasError = await formPage.assertFieldValidation(field.selector);
    if (!hasError) {
      throw new Error(`Se esperaba error de validación en campo "${fieldKey}"`);
    }
  }
);
// ─── VERIFICACIÓN DE CAMPO POR CLAVE DE CONFIG ──────────────────
Then(
  'el campo {string} existe en el formulario {string}',
  async function (this: CustomWorld, fieldKey: string, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const field = formConfig.fields[fieldKey];
    if (!field) {
      throw new Error(`Campo "${fieldKey}" no encontrado en formulario "${formKey}"`);
    }

    const locator = this.page.locator(field.selector);
    await locator.waitFor({ state: 'attached', timeout: 8000 });

    const count = await locator.count();
    if (count === 0) {
      throw new Error(
        `El campo "${fieldKey}" con selector "${field.selector}" no existe en la página`
      );
    }

    // ── Captura específica del campo (igual que screenshotElement en BasePage) ──
    await locator.scrollIntoViewIfNeeded();
    await locator.evaluate((el) => {
      return new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', () => resolve());
        }
      });
    });
    await this.wait(); // ← espera 2 segundos
    const screenshot = await locator.screenshot();
    this.attach(screenshot, 'image/png');
  }
);
// ─── CAPTURA DE CAMPO POR CLAVE ──────────────────────────────
Then(
  'capturar el campo {string} del formulario {string}',
  async function (this: CustomWorld, fieldKey: string, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const field = formConfig.fields[fieldKey];
    if (!field) {
      throw new Error(`Campo "${fieldKey}" no encontrado en formulario "${formKey}"`);
    }

    const locator = this.page.locator(field.selector);
    await locator.scrollIntoViewIfNeeded();
    await this.wait(); // ← espera 2 segundos
    const screenshot = await locator.screenshot();
    this.attach(screenshot, 'image/png');
  }
);
// ─── CAPTURA DEL FORMULARIO RELLENO ──────────────────────────
Then(
  'capturar el formulario relleno {string}',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const locator = this.page.locator(formConfig.formSelector);
    await locator.scrollIntoViewIfNeeded();
    await this.wait(); // ← espera 2 segundos
    const screenshot = await locator.screenshot();
    this.attach(screenshot, 'image/png');
  }
);
// ─── CAPTURA DEL MENSAJE DE ÉXITO ────────────────────────────
Then(
  'capturar el mensaje de éxito del formulario {string}',
  async function (this: CustomWorld, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const locator = this.page.locator(formConfig.successSelector);
    await locator.scrollIntoViewIfNeeded();
    await this.wait(); // ← espera 2 segundos
    const screenshot = await locator.screenshot();
    this.attach(screenshot, 'image/png');
  }
);
// ─── VERIFICACIÓN DE MENSAJE DE ERROR ────────────────────────
Then(
  'el formulario {string} muestra el error {string}',
  async function (this: CustomWorld, formKey: string, errorKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const errorSelector = formConfig.errorSelectors?.[errorKey];
    if (!errorSelector) {
      throw new Error(`Error "${errorKey}" no configurado en formulario "${formKey}"`);
    }

    const locator = this.page.locator(errorSelector);
    await locator.waitFor({ state: 'visible', timeout: 8000 });

    const count = await locator.count();
    if (count === 0) {
      throw new Error(
        `Se esperaba mensaje de error "${errorKey}" pero no apareció en la página`
      );
    }
  }
);
// ─── CAPTURA DEL MENSAJE DE ERROR ────────────────────────────
Then(
  'capturar el error {string} del formulario {string}',
  async function (this: CustomWorld, errorKey: string, formKey: string) {
    const formConfig = this.siteConfig.forms?.[formKey];
    if (!formConfig) {
      throw new Error(`Formulario "${formKey}" no configurado para sitio "${this.siteName}"`);
    }

    const errorSelector = formConfig.errorSelectors?.[errorKey];
    if (!errorSelector) {
      throw new Error(`Error "${errorKey}" no configurado en formulario "${formKey}"`);
    }

    const locator = this.page.locator(errorSelector);
    await locator.scrollIntoViewIfNeeded();
    await this.wait(); // ← espera 2 segundos
    const screenshot = await locator.screenshot();
    this.attach(screenshot, 'image/png');
  }
);

// ─── SELECCIÓN DE SITIO ──────────────────────────────────────

Given(
  'que el sitio activo es {string}',
  async function (this: CustomWorld, siteName: string) {
    const site = sites[siteName];
    if (!site) {
      throw new Error(
        `Sitio "${siteName}" no encontrado en sites.config.ts. ` +
        `Sitios disponibles: ${Object.keys(sites).join(', ')}`
      );
    }
    this.siteConfig = site;
    this.siteName = siteName;
  }
);