# features/hazte-voluntario-form.feature
@formulario @hazte-voluntario-contact-form
Feature: Verificación de campos del formulario "Hazte Voluntario"

  Background:
    Given que el usuario visita el formulario "hazte-voluntario"

  Scenario: Los campos obligatorios existen en el formulario
    Then el campo "nombre" existe en el formulario "hazte-voluntario"
    And el campo "ciudad" existe en el formulario "hazte-voluntario"
    And el campo "correo" existe en el formulario "hazte-voluntario"
    And el campo "comentarios" existe en el formulario "hazte-voluntario"
    And el campo "telefono" existe en el formulario "hazte-voluntario"
    And el campo "enviar" existe en el formulario "hazte-voluntario"

  Scenario: El usuario rellena y envía el formulario correctamente
    When el usuario completa el campo "nombre" del formulario "hazte-voluntario" con "Juan García"
    And capturar el campo "nombre" del formulario "hazte-voluntario"
    And el usuario completa el campo "ciudad" del formulario "hazte-voluntario" con "Springfield, USA"
    And capturar el campo "ciudad" del formulario "hazte-voluntario"
    And el usuario completa el campo "correo" del formulario "hazte-voluntario" con "homeros@gmail.com"
    And el usuario completa el campo "telefono" del formulario "hazte-voluntario" con "12345678"
    And capturar el campo "correo" del formulario "hazte-voluntario"
    And el usuario completa el campo "comentarios" del formulario "hazte-voluntario" con "Mensaje de prueba automatizada."
    And capturar el campo "comentarios" del formulario "hazte-voluntario"
    And capturar el formulario relleno "hazte-voluntario"
    And el usuario envía el formulario "hazte-voluntario"
    Then el formulario "hazte-voluntario" muestra mensaje de éxito
    And capturar el mensaje de éxito del formulario "hazte-voluntario"