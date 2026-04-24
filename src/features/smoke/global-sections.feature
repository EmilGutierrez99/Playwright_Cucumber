@smoke
Feature: Smoke — Header y Footer en todas las páginas

  # Este feature prueba automáticamente que header y footer
  # existan en TODAS las páginas del sitio.
  # Para agregar una página nueva, solo añade una fila a la tabla Examples.

  Scenario Outline: El Header es visible en <pagina>
    Given que el usuario visita la página "<pagina>"
    Then la sección "header" de la página "<pagina>" es visible

    Examples:
      | pagina            |
      | inicio            |
      | aportaciones      |
      | noticias          |
      | hazte-voluntario  |

  Scenario Outline: El Footer es visible en <pagina>
    Given que el usuario visita la página "<pagina>"
    Then la sección "footer" de la página "<pagina>" es visible

    Examples:
      | pagina            |
      | inicio            |
      | aportaciones      |
      | noticias          |
      | hazte-voluntario  |
