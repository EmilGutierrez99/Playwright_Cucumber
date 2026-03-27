@smoke
Feature: Smoke — Página de Aportaciones

  Background:
    Given que el usuario visita la página "aportaciones"

  Scenario: El bloque Ayuda al Comando es visible
    Then la sección "ayuda-al-comando" de la página "aportaciones" es visible
    And capturar la sección "ayuda-al-comando" de la página "aportaciones"

  Scenario: La página tiene suficientes secciones qa-ticbo
    Then la página "aportaciones" tiene al menos 10 secciones qa-ticbo
    And activar captura de página completa
