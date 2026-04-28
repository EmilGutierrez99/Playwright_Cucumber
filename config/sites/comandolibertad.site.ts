/**
 * comandolibertad.site.ts
 *
 * Configuración exclusiva del sitio Comando Libertad.
 * No importa ni depende de ningún otro sitio.
 */

import type { SiteConfig } from './types';

export const comandolibertad: SiteConfig = {
  baseUrl: 'https://www.comandolibertad.com',
  qaPrefix: 'cmndlbrtd',

  // ─────────────────────────────────────────────────
  // PÁGINAS
  // ─────────────────────────────────────────────────

  pages: {

    // ── Inicio ──────────────────────────────────────
    inicio: {
      path: '/',
      sections: {
        header:                  { qaAttr: 'header',                global: true },
        footer:                  { qaAttr: 'footer',                global: true },
        'slider-principal':      { qaAttr: 'slider-principal' },
        'quienes-somos':         { qaAttr: 'quienes-somos' },
        'que-hacemos':           { qaAttr: 'que-hacemos' },
        'conoce-en-tiempo-real': { qaAttr: 'conoce-en-tiempo-real' },
        prensa:                  { qaAttr: 'prensa' },
        actualidad:              { qaAttr: 'actualidad' },
        'proximos-eventos':      { qaAttr: 'proximos-eventos' },
        'slider-secundario':     { qaAttr: 'slider-secundario' },
        proyectos:               { qaAttr: 'proyectos' },
        'sitios-de-interes':     { qaAttr: 'sitios-de-interes' },
      },
    },

    // ── Aportaciones ────────────────────────────────
    // qa-ticbo="cmndlbrtd_aportaciones_<seccion>"
    aportaciones: {
      path: '/aportaciones/',
      sections: {
        header:                            { qaAttr: 'header',                           global: true },
        footer:                            { qaAttr: 'footer',                           global: true },
        'ayuda-al-comando':                { qaAttr: 'ayuda-al-comando' },
        'acciones':                        { qaAttr: 'acciones' },
        'opciones-de-donacion':            { qaAttr: 'opciones-de-donacion' },
        'donacion-transferencia-bancaria': { qaAttr: 'donacion-transferencia-bancaria' },
        'donacion-bizum':                  { qaAttr: 'donacion-bizum' },
        'donacion-tarjeta-de-credito':     { qaAttr: 'donacion-tarjeta-de-credito' },
        'donacion-paypal':                 { qaAttr: 'donacion-paypal' },
        'donacion-suscripcion-mensual':    { qaAttr: 'donacion-suscripcion-mensual' },
      },
    },

    // ── Noticias ────────────────────────────────────
    // qa-ticbo="cmndlbrtd_noticias_<seccion>"
    noticias: {
      path: '/noticias/',
      sections: {
        header:                       { qaAttr: 'header',           global: true },
        footer:                       { qaAttr: 'footer',           global: true },
        'noticias-prensa':            { qaAttr: 'prensa' },
        'noticias-actualidad':        { qaAttr: 'actualidad' },
        'noticias-hazte-voluntario':  { qaAttr: 'hazte-voluntario' },
      },
    },

    // ── Hazte voluntario ────────────────────────────
    // qa-ticbo="cmndlbrtd_hazte-voluntario_<seccion>"
    'hazte-voluntario': {
      path: '/hazte-voluntario/',
      sections: {
        header:       { qaAttr: 'header',      global: true },
        footer:       { qaAttr: 'footer',      global: true },
        titulo:       { qaAttr: 'titulo' },      // Banner superior "HAZTE VOLUNTARIO"
        descripcion:  { qaAttr: 'descripcion' }, // Bloque de texto de la convocatoria
        formulario:   { qaAttr: 'formulario' },  // Bloque del formulario de contacto
      },
    },

  },

  // ─────────────────────────────────────────────────
  // NAVEGACIÓN
  // ─────────────────────────────────────────────────

  navigation: [
    { label: 'Inicio',   expectedPath: '/' },
    { label: 'Prensa',   expectedPath: '/prensa/' },
    { label: 'Contacto', expectedPath: '/contacto/' },
  ],

  // ─────────────────────────────────────────────────
  // SEO
  // ─────────────────────────────────────────────────

  seo: {
    inicio: {
      title:   /Comando Libertad/i,
      ogImage: true,
    },
  },

  // ─────────────────────────────────────────────────
  // FORMULARIOS
  // ─────────────────────────────────────────────────

  forms: {

    // ── /contacto/ (Contact Form 7 — WordPress) ────
    contacto: {
      pagePath:        '/contacto/',
      formSelector:    '.wpcf7-form',
      submitSelector:  '.wpcf7-submit',
      successSelector: '.wpcf7-mail-sent-ok, .wpcf7-response-output',
      fields: {
        nombre:  { selector: 'input[name="your-name"]',            value: 'QA Test',                          type: 'text' },
        email:   { selector: 'input[name="your-email"]',           value: 'qa@test.comandolibertad.com',      type: 'email' },
        asunto:  { selector: 'input[name="your-subject"]',         value: 'Test Automatizado',                type: 'text' },
        mensaje: { selector: 'textarea[name="your-message"]',      value: 'Este es un mensaje de prueba automatizada.', type: 'textarea' },
      },
    },

    // ── /hazte-voluntario/ (Elementor Form) ────────
    'hazte-voluntario': {
      pagePath:        '/hazte-voluntario/',
      formSelector:    '.elementor-form',
      submitSelector:  '.elementor-button[type="submit"]',
      successSelector: '.elementor-message.elementor-message-success',
      fields: {
        nombre: {
          selector: 'xpath=//*[@id="form-field-form_nombre"]',
          value:    'Juan García',
          type:     'text',
        },
        ciudad: {
          selector: 'xpath=//*[@id="form-field-ciudad"]',
          value:    'Springfield, USA',
          type:     'text',
        },
        correo: {
          selector: 'xpath=//*[@id="form-field-correo"]',
          value:    'homeros@gmail.com',
          type:     'email',
        },
        telefono: {
          selector: '//*[@id="form-field-telefono"]',
          value:    '12345678',
          type:     'text',
        },
        comentarios: {
          selector: 'xpath=//*[@id="form-field-comentarios"]',
          value:    'Este es un mensaje de prueba automatizada.',
          type:     'textarea',
        },
        enviar: {
          selector: '//*[@id="qa_ticbo_form"]/div/div[7]/button/span',
          value:    'Enviar',
          type:     'text',
        },
      },
      errorSelectors: {
        'fuera-de-horario': 'xpath=//*[@id="qa_ticbo_form"]/div[2]',
      },
    },

  },
};
