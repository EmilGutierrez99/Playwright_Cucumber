/**
 * sitiolocal.site.ts
 *
 * Configuración exclusiva del sitio local (Astro dev — localhost:4321).
 * No importa ni depende de ningún otro sitio.
 */

import type { SiteConfig } from './types';

export const sitiolocal: SiteConfig = {
  baseUrl: 'http://localhost:4321',
  qaPrefix: 'local',

  // ─────────────────────────────────────────────────
  // PÁGINAS
  // ─────────────────────────────────────────────────

  pages: {

    // ── Equipo ──────────────────────────────────────
    equipo: {
      path: '/equipo',
      sections: {
        'contact-form': { qaAttr: 'contact-form' },
      },
    },

  },

  // ─────────────────────────────────────────────────
  // FORMULARIOS
  // ─────────────────────────────────────────────────

  forms: {

    // ── /equipo — ContactForm (componente Astro) ───
    contacto: {
      pagePath:        '/equipo',
      formSelector:    'xpath=//*[@id="main-content"]/section[2]/div/div',
      submitSelector:  'xpath=//*[@id="contact-form"]/div[2]/button',
      successSelector: 'xpath=//*[@id="contact-form"]/div[3]',
      fields: {
        nombre: {
          selector: 'xpath=//*[@id="cf-nombre"]',
          value:    'Juan García',
          type:     'text',
        },
        ciudad: {
          selector: 'xpath=//*[@id="cf-ciudad"]',
          value:    'Springfield, USA',
          type:     'text',
        },
        correo: {
          selector: 'xpath=//*[@id="cf-email"]',
          value:    'test@sitiolocal.com',
          type:     'email',
        },
        telefono: {
          selector: 'xpath=//*[@id="cf-telefono"]',
          value:    '12345678',
          type:     'text',
        },
        comentarios: {
          selector: 'xpath=//*[@id="cf-comentarios"]',
          value:    'Mensaje de prueba automatizada.',
          type:     'textarea',
        },
        enviar: {
          selector: 'xpath=//*[@id="contact-form"]/div[2]/button',
          value:    'Enviar',
          type:     'text',
        },
      },
      errorSelectors: {}, // TODO: rellenar cuando los errores estén configurados
    },

  },
};
