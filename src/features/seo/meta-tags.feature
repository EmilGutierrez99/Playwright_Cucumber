@seo
Feature: SEO — Meta tags y estructura on-page

  # ── Página de inicio ─────────────────────────────
  Scenario: El título de la página de inicio es correcto
    Given que el usuario visita la página "inicio"
    Then el título de la página contiene "Comando Libertad"

  Scenario: La página de inicio tiene meta description
    Given que el usuario visita la página "inicio"
    Then la meta description existe

  Scenario: La página de inicio tiene Open Graph
    Given que el usuario visita la página "inicio"
    Then la página tiene og:title
    And la página tiene og:image

  Scenario: La página de inicio tiene link canonical
    Given que el usuario visita la página "inicio"
    Then la página tiene un link canonical

  Scenario: La página de inicio tiene un solo H1
    Given que el usuario visita la página "inicio"
    Then la página tiene un solo h1

  Scenario: Las imágenes de la página de inicio tienen alt
    Given que el usuario visita la página "inicio"
    Then las imágenes tienen atributo alt

  # ── Validación SEO desde configuración ───────────
  Scenario: El SEO de la página de inicio cumple la configuración
    Given que el usuario visita la página "inicio"
    Then el SEO de la página "inicio" cumple la configuración
