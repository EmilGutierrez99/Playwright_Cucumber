@smoke
Feature: Smoke — Visibilidad de secciones en la página de inicio

  Background:
    Given que el usuario visita la página "inicio"

  # ── Estructura global ────────────────────────────
  Scenario: El Header es visible
    Then la sección "header" de la página "inicio" es visible
    And capturar la sección "header" de la página "inicio"

  Scenario: El Footer es visible
    Then la sección "footer" de la página "inicio" es visible
    And capturar la sección "footer" de la página "inicio"

  # ── Slider principal ─────────────────────────────
  Scenario: El Slider principal es visible
    Then la sección "slider-principal" de la página "inicio" es visible
    And capturar la sección "slider-principal" de la página "inicio"

  # ── Bloques de contenido ─────────────────────────
  Scenario: El bloque ¿Quiénes somos? es visible
    Then la sección "quienes-somos" de la página "inicio" es visible
    And la sección "quienes-somos" de la página "inicio" contiene texto

  Scenario: El bloque ¿Qué hacemos? es visible
    Then la sección "que-hacemos" de la página "inicio" es visible
    And capturar la sección "que-hacemos" de la página "inicio"

  Scenario: El bloque Conoce en tiempo real es visible
    Then la sección "conoce-en-tiempo-real" de la página "inicio" es visible
    And capturar la sección "conoce-en-tiempo-real" de la página "inicio"

  Scenario: El bloque Prensa es visible
    Then la sección "prensa" de la página "inicio" es visible
    And capturar la sección "prensa" de la página "inicio"

  Scenario: El bloque Actualidad es visible
    Then la sección "actualidad" de la página "inicio" es visible
    And capturar la sección "actualidad" de la página "inicio"

  Scenario: El bloque Próximos Eventos es visible
    Then la sección "proximos-eventos" de la página "inicio" es visible
    And capturar la sección "proximos-eventos" de la página "inicio"

  # ── Sliders y bloques secundarios ────────────────
  Scenario: El Slider secundario es visible
    Then la sección "slider-secundario" de la página "inicio" es visible
    And capturar la sección "slider-secundario" de la página "inicio"

  Scenario: El bloque Proyectos es visible
    Then la sección "proyectos" de la página "inicio" es visible
    And capturar la sección "proyectos" de la página "inicio"

  Scenario: El bloque Sitios de interés es visible
    Then la sección "sitios-de-interes" de la página "inicio" es visible
    And capturar la sección "sitios-de-interes" de la página "inicio"

  # ── Validación general ───────────────────────────
  Scenario: La página tiene suficientes secciones qa-ticbo
    Then la página "inicio" tiene al menos 10 secciones qa-ticbo
    And activar captura de página completa
