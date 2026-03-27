@smoke
Feature: Smoke — Página de Noticias

  Background:
    Given que el usuario visita la página "noticias"

  Scenario: El bloque Noticias Prensa es visible
    Then la sección "noticias-prensa" de la página "noticias" es visible
    And capturar la sección "noticias-prensa" de la página "noticias"

  Scenario: El bloque Noticias Actualidad es visible
    Then la sección "noticias-actualidad" de la página "noticias" es visible
    And capturar la sección "noticias-actualidad" de la página "noticias"
  
    Scenario: El bloque Hazte Voluntario es visible
    Then la sección "noticias-hazte-voluntario" de la página "noticias" es visible
    And capturar la sección "noticias-hazte-voluntario" de la página "noticias"

    # ── Validación general ───────────────────────────
  Scenario: La página tiene suficientes secciones qa-ticbo
    Then la página "noticias" tiene al menos 6 secciones qa-ticbo
    And activar captura de página completa
