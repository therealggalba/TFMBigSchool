\# Directivas de Metodología y Calidad



Este documento define las reglas estrictas (MUST) y recomendadas (SHOULD) para el ciclo de vida del desarrollo de chatsHub.



\## 1. Flujo de Trabajo (Workflow)

\* \*\*SCM\*\*: GitHub (git@github.com:therealggalba/TFMBigSchool.git).

\* \*\*Branching\*\*: Feature-branch workflow.

\* \*\*Commit Log\*\*:

&nbsp;   \* Todo commit debe reflejar una tarea manual.

&nbsp;   \* \*\*Acción Requerida\*\*: Actualizar `IMPLEMENTATIONS.md` tras cada feature completada.

\* \*\*Code Review\*\*:

&nbsp;   \* Herramienta: CodeRabbit (IA) + Revisión Humana.

&nbsp;   \* Trigger: Pull Requests.



\## 2. Desarrollo y Testing (TDD)

\*\*Objetivo de Cobertura\*\*: 100% Business Logic, >80% Features/User.



\### Ciclo TDD (Estricto)

1\.  \*\*RED\*\*: Crear test unitario/integración que falle (Vitest).

2\.  \*\*GREEN\*\*: Implementar código mínimo para pasar el test.

3\.  \*\*REFACTOR\*\*: Optimizar código bajo protección del test.



\### Stack de Pruebas

\* \*\*Unit/Integration\*\*: Vitest.

\* \*\*E2E\*\*: Playwright.



\## 3. Calidad de Código y Arquitectura

\### Principios de Diseño

El código generado debe adherirse a:

\* \*\*SOLID\*\*: (S)ingle Responsibility, (O)pen/Closed, (L)iskov, (I)nterface Segregation, (D)ependency Inversion.

\* \*\*DRY\*\*: No duplicar lógica de negocio.

\* \*\*KISS\*\*: Preferir soluciones simples y legibles.



\### Métricas de Calidad (KPIs Privados)

Monitorizar en dashboard interno:

\* Coverage %.

\* Success Rate (Tests Críticos).

\* MTTR (Mean Time To Recover).

\* Deuda Técnica (Ratio).



\## 4. Seguridad y Privacidad (Security \& Privacy by Design)

\### Reglas de Privacidad

\* \*\*Validación de Datos\*\*: Usar \*\*ZOD\*\* para todo input/output.

\* \*\*Secretos\*\*: Uso estricto de `.env`. Nunca hardcodear credenciales.

\* \*\*Encriptación\*\*: Datos sensibles en reposo deben estar encriptados.



\### Estándar OWASP Top 10

Verificar proactivamente contra:

1\.  Broken Access Control

2\.  Cryptographic Failures

3\.  Injection (SQL/NoSQL/Prompt)

4\.  Insecure Design

5\.  Security Misconfiguration

6\.  Vulnerable Components

7\.  Auth Failures

8\.  Integrity Failures

9\.  Logging Failures

10\. SSRF



\## 5. Accesibilidad y Usabilidad (A11Y)

\### Estándares

\* Cumplimiento \*\*WCAG 2.1 AA\*\*.

\* Validación de etiquetas ARIA y contraste de color.



\### Heurísticas de Nielsen (Checklist de UI)

Validar en cada nueva pantalla:

1\.  ¿Es visible el estado del sistema?

2\.  ¿El lenguaje es natural para el usuario?

3\.  ¿Tiene el usuario control y salida de emergencia?

4\.  ¿Hay consistencia en estándares?

5\.  ¿Se previenen los errores antes de ocurrir?

6\.  ¿Se favorece el reconocimiento sobre el recuerdo?

7\.  ¿Es flexible y eficiente?

8\.  ¿Diseño minimalista?

9\.  ¿Mensajes de error constructivos?

10\. ¿Ayuda y documentación accesible?



\## 6. Documentación y Observabilidad

\* \*\*Comentarios\*\*: "Code as documentation". Explicar el \*POR QUÉ\*, no el \*QUÉ\*, para desarrolladores junior.

\* \*\*Monitorización\*\*: Sentry para trazas de error en producción.

\## 7. Diseño UX
\* \*\*Estilo\*\*: Utilizaremos un método modularizado con .scss dividiendo distintos sectores de
nuestro proyecto. No se utilizará tailwind, sino css básico.
\* \*\*Colores\*\*: Se utilizará esta paleta de colores:
\* #6BFA9A (Verde)
\* #FAA92F (Naranja)
\* #8E23FA (Morado)
\* #8C71A7 (Lila)
\* #4E7A5D (Verde oscuro)
\* #806F55 (Marrón)
\* #FFFFFF (Blanco)
\* #000000 (Negro)
\* \*\*Tipografía\*\*: Se utilizará la fuente "Inter" para todo el proyecto.
\* \*\*Elementos\*\*: Los distintos elementos de la interfaz se diseñarán con un estilo moderno y minimalista, con un borde redondeado y un color de fondo que contraste con el color de texto:
\* Botones
\* Inputs
\* Cards
\* Barra de navegación
\* Chats
\* Mensajes
\* \*\*Responsive\*\*: El diseño será responsive y se adaptará a distintos tamaños de pantalla.

