# WP Test Framework

Framework de testing E2E para sitios WordPress con Playwright + Cucumber + TypeScript.

Diseñado para probar múltiples sitios WordPress con una sola suite de tests.

---

## Requisitos previos

Antes de empezar, necesitas tener instalado en tu computadora:

**Node.js** (versión 18 o superior). Para verificar si ya lo tienes, abre una terminal y escribe:

```bash
node --version
```

Si ves algo como `v18.x.x` o superior, estás listo. Si no, descárgalo desde https://nodejs.org (elige la versión LTS).

**Git** (opcional, solo si vas a clonar desde un repositorio). Para verificar:

```bash
git --version
```

---

## Instalación paso a paso

### Paso 1 — Extraer el proyecto

Descomprime el archivo `wp-test-framework.zip` en la carpeta que prefieras. Esto creará una carpeta llamada `wp-test-framework`.

En Windows puedes hacer clic derecho sobre el .zip y elegir "Extraer todo". En Mac, doble clic sobre el .zip. En Linux:

```bash
unzip wp-test-framework.zip
```

### Paso 2 — Abrir la terminal dentro de la carpeta del proyecto

Abre una terminal (o Command Prompt / PowerShell en Windows) y navega hasta la carpeta del proyecto:

```bash
cd ruta/donde/extrajiste/wp-test-framework
```

Por ejemplo, si lo extrajiste en tu escritorio:

```bash
# Windows
cd C:\Users\TuNombre\Desktop\wp-test-framework

# Mac / Linux
cd ~/Desktop/wp-test-framework
```

Verifica que estás en la carpeta correcta. Deberías ver archivos como `package.json` al ejecutar:

```bash
# Windows
dir

# Mac / Linux
ls
```

### Paso 3 — Instalar las dependencias

Ejecuta este comando (puede tardar 1-2 minutos):

```bash
npm install
```

Esto descarga todas las librerías necesarias (Playwright, Cucumber, TypeScript, etc.) y también instala automáticamente el navegador Chromium.

Si ves algún mensaje de advertencia (warnings) de color amarillo, no pasa nada, es normal. Solo preocúpate si ves errores en rojo.

### Paso 4 — Crear tu archivo de configuración de entorno

Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`:

```bash
# Mac / Linux
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

### Paso 5 — Verificar la instalación

Ejecuta un test rápido para confirmar que todo funciona:

```bash
npm run test:smoke
```

Deberías ver algo como:

```
..........

13 scenarios (13 passed)
26 steps (26 passed)
```

Si ves escenarios pasando (o fallando porque el sitio web tiene cambios), la instalación fue exitosa.

---

## Solución de problemas comunes

**"No se pudo abrir el navegador"** — Ejecuta manualmente:

```bash
npx playwright install chromium
```

**"Cannot find module"** — Asegúrate de estar dentro de la carpeta `wp-test-framework` y de haber ejecutado `npm install`.

**"EACCES permission denied" (Mac/Linux)** — Ejecuta:

```bash
sudo npm install
```

**Los tests fallan con timeout** — El sitio web puede estar lento. Edita el archivo `.env` y aumenta los valores:

```
DEFAULT_TIMEOUT=60000
NAVIGATION_TIMEOUT=90000
```

---

## Cómo ejecutar los tests

Todos los comandos se ejecutan desde la terminal, dentro de la carpeta del proyecto.

### Ejecutar todos los tests

```bash
npm test
```

### Ejecutar solo una categoría

```bash
npm run test:smoke          # Visibilidad de secciones
npm run test:navigation     # Menús y enlaces
npm run test:seo            # Meta tags y SEO on-page
npm run test:forms          # Formularios de contacto
```

### Ejecutar todo junto (regresión completa)

```bash
npm run test:regression
```

### Ver el navegador mientras ejecuta (modo debug)

Por defecto los tests corren con el navegador invisible (headless). Para verlo en pantalla:

```bash
npm run test:headed
```

Para verlo en pantalla y en cámara lenta:

```bash
npm run test:debug
```

### Generar reporte HTML

```bash
npm run report
```

Esto genera el archivo `reports/cucumber-report.html`. Ábrelo con tu navegador para ver los resultados con capturas de pantalla.

---

## Cómo cambiar de sitio WordPress

El framework puede testear cualquier sitio WordPress registrado en la configuración.

### Opción A — Editar el archivo .env

Abre el archivo `.env` con cualquier editor de texto y cambia la línea:

```
SITE=comandolibertad
```

Por el nombre del nuevo sitio (debe coincidir con una key en `config/sites.config.ts`):

```
SITE=miotrowp
```

Guarda el archivo y ejecuta los tests normalmente.

### Opción B — Pasar el sitio por línea de comandos (sin editar archivos)

```bash
npx cucumber-js --world-parameters '{"site":"miotrowp"}'
```

---

## Cómo agregar un sitio WordPress nuevo

### Paso 1 — Editar la configuración de sitios

Abre el archivo `config/sites.config.ts` con cualquier editor de código (VS Code, Sublime, etc.).

Busca la sección `export const sites` y agrega un bloque nuevo. Ejemplo:

```typescript
miotrowp: {
  baseUrl: 'https://www.miotrowp.com',
  qaPrefix: 'motwp',

  pages: {
    inicio: {
      path: '/',
      sections: {
        header: { qaAttr: 'header', global: true },
        footer: { qaAttr: 'footer', global: true },
        hero:   { qaAttr: 'hero' },
        blog:   { qaAttr: 'blog' },
      },
    },
  },

  navigation: [
    { label: 'Inicio', expectedPath: '/' },
    { label: 'Blog',   expectedPath: '/blog/' },
  ],

  seo: {
    inicio: {
      title: /Mi Otro WP/i,
      ogImage: true,
    },
  },
},
```

### Paso 2 — Actualizar el .env

```
SITE=miotrowp
```

### Paso 3 — Ejecutar

```bash
npm run test:smoke
```

Los features son genéricos: funcionan automáticamente con la nueva configuración sin tocar los archivos `.feature`.

---

## Cómo agregar una nueva página a un sitio existente

Abre `config/sites.config.ts`, busca tu sitio y agrega la página dentro de `pages`:

```typescript
nosotros: {
  path: '/nosotros/',
  sections: {
    header:   { qaAttr: 'header', global: true },
    footer:   { qaAttr: 'footer', global: true },
    historia: { qaAttr: 'historia' },
    equipo:   { qaAttr: 'equipo' },
  },
},
```

Luego puedes crear un archivo `.feature` nuevo o agregar scenarios al existente:

```gherkin
Scenario: La sección historia es visible
  Given que el usuario visita la página "nosotros"
  Then la sección "historia" de la página "nosotros" es visible
```

---

## Estructura del proyecto

```
wp-test-framework/
│
├── .env.example              ← Copia este a .env para configurar
├── .env                      ← Tu configuración local (no se sube a git)
├── cucumber.json             ← Configuración de Cucumber
├── package.json              ← Dependencias y scripts
├── tsconfig.json             ← Configuración de TypeScript
│
├── config/
│   ├── sites.config.ts       ← AQUÍ registras tus sitios WordPress
│   └── test.config.ts        ← Lee .env y prepara la configuración
│
├── src/
│   ├── features/             ← Archivos Gherkin (el "qué" se prueba)
│   │   ├── smoke/
│   │   │   └── home.feature
│   │   ├── navigation/
│   │   │   └── menu.feature
│   │   ├── seo/
│   │   │   └── meta-tags.feature
│   │   └── forms/
│   │       └── contacto.feature
│   │
│   ├── steps/                ← Step definitions (puente Gherkin → código)
│   │   ├── common.steps.ts
│   │   ├── smoke.steps.ts
│   │   ├── navigation.steps.ts
│   │   ├── seo.steps.ts
│   │   └── forms.steps.ts
│   │
│   ├── pages/                ← Page Object Model (la lógica de cada área)
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── NavigationPage.ts
│   │   ├── SeoPage.ts
│   │   └── FormPage.ts
│   │
│   └── support/
│       ├── world.ts          ← Contexto compartido entre steps
│       └── hooks.ts          ← Lifecycle del navegador y screenshots
│
└── reports/                  ← Se genera automáticamente al correr tests
    ├── cucumber-report.html
    ├── report.json
    └── screenshots/
```

---

## Selectores qa-ticbo

El framework construye los selectores automáticamente según la configuración del sitio.

Los elementos **globales** como header y footer se marcan así en el HTML del sitio:

```html
<header qa-ticbo="cmndlbrtd_header">...</header>
<footer qa-ticbo="cmndlbrtd_footer">...</footer>
```

Los elementos **de una página específica** llevan el nombre de la página:

```html
<section qa-ticbo="cmndlbrtd_inicio_quienes-somos">...</section>
<section qa-ticbo="cmndlbrtd_inicio_prensa">...</section>
```

El patrón es: `{qaPrefix}_{pagina}_{seccion}` para secciones de página, y `{qaPrefix}_{seccion}` para globales.

---

## Resumen rápido de comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala todas las dependencias |
| `npm test` | Ejecuta todos los tests |
| `npm run test:smoke` | Solo tests de visibilidad |
| `npm run test:navigation` | Solo tests de navegación |
| `npm run test:seo` | Solo tests de SEO |
| `npm run test:forms` | Solo tests de formularios |
| `npm run test:regression` | Todos los tests juntos |
| `npm run test:headed` | Tests con navegador visible |
| `npm run test:debug` | Navegador visible + cámara lenta |
| `npm run report` | Genera reporte HTML |
