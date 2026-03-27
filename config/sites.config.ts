/**
 * sites.config.ts
 *
 * Cada sitio WordPress tiene su propia configuración.
 * Para agregar un sitio nuevo, solo añade un bloque aquí.
 */

export interface SiteSection {
  /** Valor del atributo qa-ticbo (sin prefijo) */
  qaAttr: string;
  /** Si es global (header/footer) no lleva prefijo de página */
  global?: boolean;
}

export interface SitePage {
  /** Ruta relativa a la baseUrl */
  path: string;
  /** Secciones esperadas en esta página */
  sections: Record<string, SiteSection>;
}

export interface NavItem {
  label: string;
  /** Ruta esperada tras hacer clic */
  expectedPath: string;
  /** Selectores para encontrar el enlace del menú */
  selector?: string;
}

export interface FormConfig {
  /** Ruta de la página que contiene el formulario */
  pagePath: string;
  /** Selector del formulario */
  formSelector: string;
  /** Campos con su selector y un valor de prueba */
  fields: Record<string, { selector: string; value: string; type?: 'text' | 'email' | 'textarea' | 'select' }>;
  /** Selector del botón de envío */
  submitSelector: string;
  /** Selector del mensaje de éxito */
  successSelector: string;
}

export interface SiteConfig {
  baseUrl: string;
  /** Prefijo para los atributos qa-ticbo (ej: "cmndlbrtd") */
  qaPrefix: string;
  /** Páginas del sitio y sus secciones */
  pages: Record<string, SitePage>;
  /** Elementos del menú principal para tests de navegación */
  navigation?: NavItem[];
  /** Configuración de formularios */
  forms?: Record<string, FormConfig>;
  /** Meta tags SEO esperados por página */
  seo?: Record<string, {
    title?: string | RegExp;
    description?: string | RegExp;
    ogTitle?: string | RegExp;
    ogImage?: boolean;
    canonical?: string | RegExp;
  }>;
}

// ─────────────────────────────────────────────────
// SITIOS REGISTRADOS
// ─────────────────────────────────────────────────
export const sites: Record<string, SiteConfig> = {

  comandolibertad: {
    baseUrl: 'https://www.comandolibertad.com',
    qaPrefix: 'cmndlbrtd',

    pages: {
      // ── Inicio ──────────────────────────────────────
      inicio: {
        path: '/',
        sections: {
          header:                  { qaAttr: 'header', global: true },
          footer:                  { qaAttr: 'footer', global: true },
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
      // qa-ticbo="cmndlbrtd_aportaciones_ayuda-al-comando"
      aportaciones: {
        path: '/aportaciones/',
        sections: {
          header:                             { qaAttr: 'header', global: true },
          footer:                             { qaAttr: 'footer', global: true },
          'ayuda-al-comando':                 { qaAttr: 'ayuda-al-comando' },
          'acciones':                         { qaAttr: 'acciones' },
          'opciones-de-donacion':             { qaAttr: 'opciones-de-donacion' },
          'donacion-transferencia-bancaria':  { qaAttr: 'donacion-transferencia-bancaria' },
          'donacion-bizum':                   { qaAttr: 'donacion-bizum' },
          'donacion-tarjeta-de-credito':      { qaAttr: 'donacion-tarjeta-de-credito' },
          'donacion-paypal':                  { qaAttr: 'donacion-paypal' },
          'donacion-suscripcion-mensual':     { qaAttr: 'donacion-suscripcion-mensual' },
        },
      },

      // ── Noticias ────────────────────────────────────
      // qa-ticbo="cmndlbrtd_noticias_<seccion>"
      noticias: {
        path: '/noticias/',
        sections: {
          header:                  { qaAttr: 'header', global: true },
          footer:                  { qaAttr: 'footer', global: true },
          // Agrega aquí las secciones reales de la página:
          'noticias-prensa':              { qaAttr: 'prensa' },
          'noticias-actualidad':          { qaAttr: 'actualidad' },
          'noticias-hazte-voluntario':    { qaAttr: 'hazte-voluntario' },
        },
      },

      // ── Hazte voluntario ────────────────────────────
      // qa-ticbo="cmndlbrtd_hazte-voluntario_<seccion>"
      'hazte-voluntario': {
        path: '/hazte-voluntario/',
        sections: {
          header:                  { qaAttr: 'header', global: true },
          footer:                  { qaAttr: 'footer', global: true },
          // Agrega aquí las secciones reales de la página:
          // 'formulario':         { qaAttr: 'formulario' },
          // 'beneficios':         { qaAttr: 'beneficios' },
        },
      },
    },

    navigation: [
      { label: 'Inicio',    expectedPath: '/' },
      { label: 'Prensa',    expectedPath: '/prensa/' },
      { label: 'Contacto',  expectedPath: '/contacto/' },
    ],

    seo: {
      inicio: {
        title: /Comando Libertad/i,
        ogImage: true,
      },
    },

    forms: {
      contacto: {
        pagePath: '/contacto/',
        formSelector: '.wpcf7-form',
        fields: {
          nombre: { selector: 'input[name="your-name"]',    value: 'QA Test',               type: 'text' },
          email:  { selector: 'input[name="your-email"]',   value: 'qa@test.comandolibertad.com', type: 'email' },
          asunto: { selector: 'input[name="your-subject"]', value: 'Test Automatizado',     type: 'text' },
          mensaje:{ selector: 'textarea[name="your-message"]', value: 'Este es un mensaje de prueba automatizada.', type: 'textarea' },
        },
        submitSelector: '.wpcf7-submit',
        successSelector: '.wpcf7-mail-sent-ok, .wpcf7-response-output',
      },
    },
  },

  // ─── EJEMPLO: otro sitio WordPress ──────────────
  // miotrowp: {
  //   baseUrl: 'https://www.miotrowp.com',
  //   qaPrefix: 'motwp',
  //   pages: {
  //     inicio: {
  //       path: '/',
  //       sections: {
  //         header: { qaAttr: 'header', global: true },
  //         footer: { qaAttr: 'footer', global: true },
  //         hero:   { qaAttr: 'hero' },
  //       },
  //     },
  //   },
  // },
};
