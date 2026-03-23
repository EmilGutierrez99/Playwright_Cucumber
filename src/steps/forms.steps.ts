import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { FormPage } from '../pages/FormPage';

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
