@navigation
Feature: Navegación — Menú principal y enlaces internos

  # ── Visibilidad del menú ─────────────────────────
  Scenario: Los enlaces del menú principal son visibles
    Given que el usuario visita la página "inicio"
    Then todos los enlaces del menú principal son accesibles

  Scenario: El menú contiene enlace a Inicio
    Given que el usuario visita la página "inicio"
    Then el menú contiene el enlace "Inicio"

  Scenario: El menú contiene enlace a Prensa
    Given que el usuario visita la página "inicio"
    Then el menú contiene el enlace "Prensa"

  Scenario: El menú contiene enlace a Contacto
    Given que el usuario visita la página "inicio"
    Then el menú contiene el enlace "Contacto"

  # ── Navegación funcional ─────────────────────────
  Scenario: Clic en Prensa navega correctamente
    Given que el usuario visita la página "inicio"
    When el usuario hace clic en el enlace del menú "Prensa"
    Then la URL contiene "/prensa/"

  Scenario: Clic en Contacto navega correctamente
    Given que el usuario visita la página "inicio"
    When el usuario hace clic en el enlace del menú "Contacto"
    Then la URL contiene "/contacto/"

  # ── Enlaces internos ─────────────────────────────
  Scenario: La página de inicio tiene enlaces internos
    Given que el usuario visita la página "inicio"
    Then la página tiene enlaces internos
