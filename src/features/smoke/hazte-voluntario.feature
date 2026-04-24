@smoke @hazte-voluntario
Feature: Smoke — Página Hazte Voluntario

  # Verifica que las secciones principales de la página sean visibles.
  # Antes de ejecutar, asegúrate de haber colocado los atributos
  # qa-ticbo en el HTML de la página (ver README — sección Etiquetas QA).

  Background:
    Given que el usuario visita la página "hazte-voluntario"

  # ── Secciones globales ──────────────────────────

  Scenario: El header es visible
    Then la sección "header" de la página "hazte-voluntario" es visible

  Scenario: El footer es visible
    Then la sección "footer" de la página "hazte-voluntario" es visible

  # ── Secciones de contenido ──────────────────────

  Scenario: El banner de título "Hazte Voluntario" es visible
    Then la sección "titulo" de la página "hazte-voluntario" es visible
    And capturar la sección "titulo" de la página "hazte-voluntario"

  Scenario: El bloque de descripción es visible
    Then la sección "descripcion" de la página "hazte-voluntario" es visible
    And capturar la sección "descripcion" de la página "hazte-voluntario"

  Scenario: El bloque del formulario de contacto es visible
    Then la sección "formulario" de la página "hazte-voluntario" es visible
    And capturar la sección "formulario" de la página "hazte-voluntario"

  # ── Cobertura mínima de secciones ──────────────

  Scenario: La página tiene suficientes secciones qa-ticbo
    Then la página "hazte-voluntario" tiene al menos 5 secciones qa-ticbo
    And activar captura de página completa
