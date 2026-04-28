@smoke @sitiolocal @formulario-local-form-equipo
Feature: Smoke test - Campos del formulario de contacto en página Equipo

Background:
  Given que el sitio activo es "sitiolocal"
  And que el usuario visita el formulario "contacto"

  Scenario: Los campos del formulario de contacto existen
    Then el campo "nombre" existe en el formulario "contacto"
    And capturar el campo "nombre" del formulario "contacto"
    And el campo "ciudad" existe en el formulario "contacto"
    And capturar el campo "ciudad" del formulario "contacto"
    And el campo "correo" existe en el formulario "contacto"
    And capturar el campo "correo" del formulario "contacto"
    And el campo "telefono" existe en el formulario "contacto"
    And capturar el campo "telefono" del formulario "contacto"
    And el campo "comentarios" existe en el formulario "contacto"
    And capturar el campo "comentarios" del formulario "contacto"
    And el campo "enviar" existe en el formulario "contacto"
    And capturar el campo "enviar" del formulario "contacto"
    And capturar el formulario relleno "contacto"

Scenario: El usuario rellena y envía el formulario correctamente
    When el usuario completa el campo "nombre" del formulario "contacto" con "Juan García"
    And capturar el campo "nombre" del formulario "contacto"
    And el usuario completa el campo "ciudad" del formulario "contacto" con "Springfield, USA"
    And capturar el campo "ciudad" del formulario "contacto"
    And el usuario completa el campo "correo" del formulario "contacto" con "test@sitiolocal.com"
    And capturar el campo "correo" del formulario "contacto"
    And el usuario completa el campo "telefono" del formulario "contacto" con "12345678"
    And capturar el campo "telefono" del formulario "contacto"
    And el usuario completa el campo "comentarios" del formulario "contacto" con "Mensaje de prueba automatizada."
    And capturar el campo "comentarios" del formulario "contacto"
    And capturar el formulario relleno "contacto"
    And el usuario envía el formulario "contacto"
    Then el formulario "contacto" muestra mensaje de éxito
    And capturar el mensaje de éxito del formulario "contacto"

