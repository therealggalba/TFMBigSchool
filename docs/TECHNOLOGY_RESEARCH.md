\# Definición Técnica e Infraestructura: chatsHub EdTech



Documento de referencia técnica para la versión definitiva. Define roles, flujos de datos y stack tecnológico.



\## 1. Modelo de Dominio y Roles



\### A. El Profesor (The Master / Architect)

\* \*\*Función\*\*: Configuración del entorno (Seed).

\* \*\*Capacidades\*\*:

&nbsp;   \* Selección de "Mentes Maestras" (Personas activas).

&nbsp;   \* Definición de "Guías Pedagógicas" (System Prompts).

&nbsp;   \* Carga de Conocimiento (RAG): Subida de PDFs/Markdown para contexto prioritario.

\* \*\*Storage\*\*: Nube Pública/Privada (Supabase) - \*Datos no sensibles\*.



\### B. El Alumno (The Learner)

\* \*\*Función\*\*: Consumo activo y generación de conocimiento propio.

\* \*\*Capacidades\*\*:

&nbsp;   \* Interacción vía Chat (Texto/Voz).

&nbsp;   \* Persistencia de Notas/Insights ("Hallazgos").

\* \*\*Storage\*\*: Local (IndexedDB) - \*Datos sensibles y privados\*.



\## 2. Arquitectura de Datos y Privacidad (Data Flow)



\### Capa 1: Pública / Institucional (Read-Only para el Alumno)

\* \*\*Tecnología\*\*: \*\*Supabase\*\*.

\* \*\*Contenido\*\*: Definiciones de Personas, Temarios vectorizados, Configuración de clase.

\* \*\*Seguridad\*\*: Acceso global o por ID de institución.



\### Capa 2: Privada / Local (Write-Heavy para el Alumno)

\* \*\*Tecnología\*\*: \*\*IndexedDB (Dexie.js)\*\*.

\* \*\*Contenido\*\*: Historial de chat, Notas personales, Perfil de aprendizaje (puntos débiles detectados).

\* \*\*Privacidad\*\*: "Air-gapped" lógicamente. El profesor recibe analíticas agregadas anónimas, nunca lectura directa de chats.



\## 3. Stack Tecnológico



\### Core \& Framework

\* \*\*Frontend/Backend\*\*: \*\*Next.js\*\*.

\* \*\*Middleware\*\*: Gestión de sesiones y protección de rutas (RBAC: Master vs Student).



\### Motor de Inteligencia Artificial

\* \*\*Orquestación\*\*: \*\*Vercel AI SDK\*\*.

\* \*\*Streaming\*\*: Respuesta híbrida (Conocimiento base LLM + Contexto RAG del Profesor).

\* \*\*Safety Layer\*\*: Filtros de moderación (Input/Output) para entorno escolar seguro.



\## 4. Sistema de Analytics e Inteligencia de Aprendizaje

Mecanismo de feedback loop para personalización:

1\.  \*\*Input\*\*: Pregunta del alumno.

2\.  \*\*Process (Background)\*\*: Clasificación de la duda (ej. "Fallo conceptual en Álgebra").

3\.  \*\*Storage\*\*: Actualización del perfil local del alumno en Dexie.js.

4\.  \*\*Action\*\*: Los LLMs ajustan el tono/nivel en futuras respuestas basándose en este perfil.



\## 5. Hoja de Ruta (Future Proofing)

\* \*\*Video Generativo\*\*: Arquitectura preparada para integrar APIs de video (Sora/HeyGen) como capa de presentación sobre la respuesta textual.

