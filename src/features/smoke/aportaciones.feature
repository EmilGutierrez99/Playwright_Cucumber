@smoke
Feature: Smoke — Página de Aportaciones

  Background:
    Given que el usuario visita la página "aportaciones"

  Scenario: El bloque Ayuda al Comando es visible
    Then la sección "ayuda-al-comando" de la página "aportaciones" es visible
    And capturar la sección "ayuda-al-comando" de la página "aportaciones"

  Scenario: El bloque Acciones es visible
    Then la sección "acciones" de la página "aportaciones" es visible
    And capturar la sección "acciones" de la página "aportaciones"

  Scenario: El bloque Opciones de Donacion es visible
    Then la sección "opciones-de-donacion" de la página "aportaciones" es visible
    And capturar la sección "opciones-de-donacion" de la página "aportaciones"

  Scenario: El bloque Donacion Transferencia Bancaria es visible
    Then la sección "donacion-transferencia-bancaria" de la página "aportaciones" es visible
    And capturar la sección "donacion-transferencia-bancaria" de la página "aportaciones"

  Scenario: El bloque Donacion Bizum es visible
    Then la sección "donacion-bizum" de la página "aportaciones" es visible
    And capturar la sección "donacion-bizum" de la página "aportaciones"

  Scenario: El bloque Donacion Tarjeta de Credito es visible
    Then la sección "donacion-tarjeta-de-credito" de la página "aportaciones" es visible
    And capturar la sección "donacion-tarjeta-de-credito" de la página "aportaciones"

  Scenario: El bloque Donacion Paypal es visible
    Then la sección "donacion-paypal" de la página "aportaciones" es visible
    And capturar la sección "donacion-paypal" de la página "aportaciones"

  Scenario: El bloque Donacion Suscripcion Mensual es visible
    Then la sección "donacion-suscripcion-mensual" de la página "aportaciones" es visible
    And capturar la sección "donacion-suscripcion-mensual" de la página "aportaciones"

  Scenario: La página tiene suficientes secciones qa-ticbo
    Then la página "aportaciones" tiene al menos 10 secciones qa-ticbo
    And activar captura de página completa
