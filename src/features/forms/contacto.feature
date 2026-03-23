@forms
Feature: Formularios — Formulario de contacto

  Background:
    Given que el usuario visita el formulario "contacto"

  # ── Visibilidad ──────────────────────────────────
  Scenario: El formulario de contacto es visible
    Then el formulario "contacto" es visible

  # ── Envío exitoso ────────────────────────────────
  Scenario: Envío del formulario de contacto con datos válidos
    When el usuario completa el formulario "contacto" con datos de prueba
    And el usuario envía el formulario "contacto"
    Then el formulario "contacto" muestra mensaje de éxito

  # ── Validación de campos vacíos ──────────────────
  Scenario: El formulario no se envía con campos vacíos
    When el usuario envía el formulario "contacto"
    Then el campo "email" del formulario "contacto" muestra error de validación

  # ── Validación de email inválido ─────────────────
  Scenario: El formulario rechaza un email inválido
    When el usuario completa el campo "nombre" del formulario "contacto" con "QA Test"
    And el usuario completa el campo "email" del formulario "contacto" con "no-es-un-email"
    And el usuario envía el formulario "contacto"
    Then el campo "email" del formulario "contacto" muestra error de validación
