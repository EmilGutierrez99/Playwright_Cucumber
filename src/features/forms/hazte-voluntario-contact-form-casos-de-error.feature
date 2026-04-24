# features/hazte-voluntario-contact-form-casos-de-error.feature
@formulario @hazte-voluntario-contact-form-casos-de-error
Feature: Casos de error en el formulario "Hazte Voluntario"

Background:
    Given que el usuario visita el formulario "hazte-voluntario"

Scenario: El formulario muestra error fuera del horario de atención
  When el usuario completa el campo "nombre" del formulario "hazte-voluntario" con "Juan Garcías"
  And el usuario completa el campo "ciudad" del formulario "hazte-voluntario" con "Springfield, USA"
  And el usuario completa el campo "correo" del formulario "hazte-voluntario" con "homeros@gmail.com"
  And el usuario completa el campo "telefono" del formulario "hazte-voluntario" con "12345678"
  And el usuario completa el campo "comentarios" del formulario "hazte-voluntario" con "Mensaje de prueba automatizada."
  And el usuario envía el formulario "hazte-voluntario"
  Then el formulario "hazte-voluntario" muestra el error "fuera-de-horario"
  And capturar el error "fuera-de-horario" del formulario "hazte-voluntario"
  And capturar el formulario relleno "hazte-voluntario"

Scenario: El formulario no se envía si el campo nombre está vacío
  When el usuario completa el campo "ciudad" del formulario "hazte-voluntario" con "Springfield, USA"
  And el usuario completa el campo "correo" del formulario "hazte-voluntario" con "homeros@gmail.com"
  And el usuario completa el campo "telefono" del formulario "hazte-voluntario" con "12345678"
  And el usuario completa el campo "comentarios" del formulario "hazte-voluntario" con "Mensaje de prueba automatizada."
  And el usuario envía el formulario "hazte-voluntario"
  And capturar el formulario relleno "hazte-voluntario"

Scenario: El formulario no se envía si el campo ciudad está vacío
  When el usuario completa el campo "nombre" del formulario "hazte-voluntario" con "Juan García"
  And el usuario completa el campo "correo" del formulario "hazte-voluntario" con "Juan García"
  And el usuario completa el campo "telefono" del formulario "hazte-voluntario" con "12345678"
  And el usuario completa el campo "comentarios" del formulario "hazte-voluntario" con "Mensaje de prueba automatizada."
  And el usuario envía el formulario "hazte-voluntario"
  And capturar el formulario relleno "hazte-voluntario"

Scenario: El formulario no se envía si el campo correo está vacío
  When el usuario completa el campo "ciudad" del formulario "hazte-voluntario" con "Springfield, USA"
  And el usuario completa el campo "nombre" del formulario "hazte-voluntario" con "Juan García"
  And el usuario completa el campo "telefono" del formulario "hazte-voluntario" con "12345678"
  And el usuario completa el campo "comentarios" del formulario "hazte-voluntario" con "Mensaje de prueba automatizada."
  And el usuario envía el formulario "hazte-voluntario"
  And capturar el formulario relleno "hazte-voluntario"

Scenario: El formulario no se envía si el campo comentarios está vacío
  When el usuario completa el campo "nombre" del formulario "hazte-voluntario" con "Juan García"
  And el usuario completa el campo "ciudad" del formulario "hazte-voluntario" con "Springfield, USA"
  And el usuario completa el campo "correo" del formulario "hazte-voluntario" con "homeros@gmail.com"
  And el usuario completa el campo "telefono" del formulario "hazte-voluntario" con "12345678"
  And el usuario envía el formulario "hazte-voluntario"
  And capturar el formulario relleno "hazte-voluntario"

Scenario: El formulario no se envía si el campo teléfono está vacío
  When el usuario completa el campo "nombre" del formulario "hazte-voluntario" con "Juan García"
  And el usuario completa el campo "ciudad" del formulario "hazte-voluntario" con "Springfield, USA"
  And el usuario completa el campo "correo" del formulario "hazte-voluntario" con "homeros@gmail.com"
  And el usuario completa el campo "comentarios" del formulario "hazte-voluntario" con "Mensaje de prueba automatizada."
  And el usuario envía el formulario "hazte-voluntario"
  And capturar el formulario relleno "hazte-voluntario"