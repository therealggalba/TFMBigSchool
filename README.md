# TFMv1 - chatsHub (AI Persona System)

Este proyecto es el núcleo de un sistema de tutoría educativa basado en IA, diseñado para permitir conversaciones inmersivas con personalidades expertas.

## Características Principales

- **Carga Global de LLM**: El motor Llama-3-8B se inicializa una sola vez en el Home, cacheando el modelo en memoria para una experiencia de chat instantánea.
- **Sistema de Personalidades (Personas)**: Arquitectura robusta basada en IndexedDB (Dexie.js) para la persistencia de expertos.
- **Inyección de Personalidad Dinámica**: Transición fluida mediante un "Skeleton de Personalidad" que oculta los tiempos de carga técnicos.
- **Rigor de Conocimiento**: Política de **Alucinación Cero** integrada en el núcleo, forzando a los expertos a admitir ignorancia de forma natural si el tema no les compete.
- **Diseño Premium**: Interfaz en 3 columnas optimizada, con un header global y avatars de alto impacto.

## Expertos Disponibles

1. **Rafael Nadal**: Especialista en tenis, resiliencia y cultura mallorquina.
2. **Rosalía**: Experta musical académica (ESMUC) con tono urbano/Motomami.

## Tecnologías Utilizadas

- **Next.js 15 (App Router)**
- **TypeScript**
- **Web-LLM (MLC-AI)** - Ejecución local de LLMs en el navegador.
- **Dexie.js** - Base de datos local-first.
- **SCSS Modules** - Estilado modular y escalable.
- **Vitest** - Unit testing para lógica de negocio.

## Desarrollo

Para ejecutar el proyecto localmente:

```bash
npm install
npm run dev
```

Las personalidades se siembran automáticamente al cargar el Home por primera vez.
