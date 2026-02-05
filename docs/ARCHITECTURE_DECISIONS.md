# Registro de Decisiones de Arquitectura (ADR) - chatsHub

Este documento sirve como fuente de verdad para la lógica arquitectónica del sistema. Toda implementación futura debe alinearse con estos principios.

## Índice de Decisiones

| ID | Título | Estado | Etiquetas |
|:---|:---|:---|:---|
| ADR-001 | Estrategia de IA Híbrida | Aceptado | Core, AI, Performance |
| ADR-002 | Orquestación Centralizada (Alfredo) | Aceptado | UX, Routing |
| ADR-003 | Persistencia Local-First (IndexedDB) | Aceptado | Data, Privacy, Cost |
| ADR-004 | Dominio Educativo y Personas | Aceptado | Product, Scope |
| ADR-005 | Catálogo de Expertos (Panteón) | Aceptado | Content, Quality |
| ADR-006 | Desacoplamiento Núcleo/Contenido | Aceptado | Architecture, Maintainability |
| ADR-007 | Distribución B2B (Instancia Escolar) | Aceptado | Business, Security |
| ADR-008 | RAG sobre Temarios Oficiales | Aceptado | AI, Accuracy |
| ADR-009 | Escalabilidad a Video Generativo | Propuesto | Future, UI |

---

## Detalles de Decisiones

### ADR-001: Estrategia de IA - Dualidad Local/Remota
* **Contexto**: Necesidad de equilibrar costes de desarrollo con calidad final de producción.
* **Decisión**: Implementar interfaz `ILLMProvider` agnóstica para alternar entre `Web-LLM` (Local/Navegador) y `OpenAI/Claude` (Remoto/API).
* **Consecuencias**:
    * (+) Coste cero en desarrollo y testing.
    * (+) Capacidad "Premium" bajo demanda.
    * (+) Resiliencia ante caídas de red (modo local).

### ADR-002: Orquestación mediante Agente Maestro
* **Contexto**: La selección manual de expertos crea fricción cognitiva en el usuario.
* **Decisión**: "Alfredo" (Agente Mayordomo) actúa como *Router* de intenciones natural.
* **Consecuencias**:
    * (+) UX fluida y narrativa cohesiva.
    * (+) Complejidad técnica en el prompt del enrutador.

### ADR-003: Persistencia de Datos "Local-First"
* **Contexto**: Requisitos estrictos de privacidad (menores de edad) y minimización de costes de infraestructura cloud.
* **Decisión**: Uso exclusivo de **IndexedDB** (vía Dexie.js) para datos de usuario (chats, memorias). Supabase se descarta para datos privados.
* **Consecuencias**:
    * (+) Privacidad absoluta (GDPR friendly por diseño).
    * (+) Latencia cero en operaciones de lectura/escritura.
    * (-) Dificultad para sincronizar entre dispositivos del mismo usuario (aceptable para MVP).

### ADR-004 y ADR-005: Especialización y Catálogo
* **Contexto**: Evitar alucinaciones en ámbitos generales y enfocar en el sector EdTech.
* **Decisión**: Limitar el alcance a asignaturas curriculares con avatares históricos fijos (ej. Gauss/Matemáticas, Curie/Ciencia).
* **Consecuencias**:
    * (+) Control de calidad del tono y contenido pedagógico.
    * (+) Identidad de marca fuerte.

### ADR-006: Separación Núcleo vs. Contenido
* **Contexto**: Necesidad de actualizar temarios sin redesplegar la aplicación.
* **Decisión**: Arquitectura de plugins donde "Persona Packs" (JSON/DB) se inyectan en el motor lógico.
* **Consecuencias**:
    * (+) Extensibilidad modular.
    * (+) Mantenimiento simplificado.

### ADR-007: Modelo B2B Institucional
* **Contexto**: El entorno educativo requiere control y seguridad, no un marketplace abierto.
* **Decisión**: Software como infraestructura privada por centro educativo.

### ADR-008: RAG (Retrieval-Augmented Generation)
* **Contexto**: Los LLMs genéricos fallan en currículos específicos.
* **Decisión**: Ingesta de PDFs/Markdown oficiales para vectorización y consulta.
* **Consecuencias**:
    * (+) Alineación con el examen real del alumno.
    * (+) Reducción drástica de alucinaciones.

### ADR-009: Preparación para Video Generativo
* **Contexto**: Futura mejora de engagement.
* **Decisión**: Diseñar interfaces de UI que soporten streaming de video en el futuro (placeholders de arquitectura).