import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { FormConfig } from '../../config/sites.config';

/**
 * FormPage — interacciones con formularios WordPress.
 *
 * Soporta Contact Form 7, WPForms, Gravity Forms y formularios genéricos.
 */
export class FormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Localiza el formulario */
  form(selector: string): Locator {
    return this.page.locator(selector).first();
  }

  /** Rellena un campo según su tipo */
  async fillField(
    selector: string,
    value: string,
    type: string = 'text'
  ): Promise<void> {
    const field = this.page.locator(selector).first();
    await field.scrollIntoViewIfNeeded();

    switch (type) {
      case 'textarea':
        await field.fill(value);
        break;
      case 'select':
        await field.selectOption(value);
        break;
      case 'text':
      case 'email':
      default:
        await field.fill(value);
        break;
    }
  }

  /** Rellena todos los campos de un formulario según config */
  async fillForm(formConfig: FormConfig): Promise<void> {
    for (const [, field] of Object.entries(formConfig.fields)) {
      await this.fillField(field.selector, field.value, field.type);
    }
  }

  /** Envía el formulario */
  async submit(submitSelector: string): Promise<void> {
    const button = this.page.locator(submitSelector).first();
    await button.click();
  }

  /** Espera el mensaje de éxito/respuesta del formulario */
  async waitForResponse(successSelector: string, timeout = 15_000): Promise<void> {
    const response = this.page.locator(successSelector).first();
    await expect(response).toBeVisible({ timeout });
  }

  /** Verifica que un campo muestre error de validación nativa del navegador */
  async assertFieldValidation(selector: string): Promise<boolean> {
    return await this.page.locator(selector).first().evaluate((el) => {
      const input = el as HTMLInputElement;
      return !input.checkValidity();
    });
  }

  /** Verifica validación de Contact Form 7 (clase .wpcf7-not-valid) */
  async assertCF7ValidationError(fieldSelector: string): Promise<void> {
    const field = this.page.locator(fieldSelector).first();
    await expect(field).toHaveClass(/wpcf7-not-valid/);
  }

  /** Verifica que el formulario esté presente y sea visible */
  async assertFormVisible(formSelector: string): Promise<void> {
    const formLocator = this.form(formSelector);
    await this.assertVisible(formLocator);
  }
}
