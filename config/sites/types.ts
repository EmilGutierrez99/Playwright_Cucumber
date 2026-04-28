/**
 * types.ts
 *
 * Interfaces compartidas para la configuración de sitios.
 * Importa desde aquí en cada fichero *.site.ts y en sites.index.ts.
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

export interface FormField {
  selector: string;
  value: string;
  type?: 'text' | 'email' | 'textarea' | 'select';
}

export interface FormConfig {
  /** Ruta de la página que contiene el formulario */
  pagePath: string;
  /** Selector del formulario */
  formSelector: string;
  /** Campos con su selector y un valor de prueba */
  fields: Record<string, FormField>;
  /** Selector del botón de envío */
  submitSelector: string;
  /** Selector del mensaje de éxito */
  successSelector: string;
  /** Selectores de mensajes de error específicos (opcional) */
  errorSelectors?: Record<string, string>;
}

export interface SeoConfig {
  title?: string | RegExp;
  description?: string | RegExp;
  ogTitle?: string | RegExp;
  ogImage?: boolean;
  canonical?: string | RegExp;
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
  seo?: Record<string, SeoConfig>;
}
