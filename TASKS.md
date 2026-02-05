Este documento desglosa el desarrollo de chatsHub en tareas diminutas. Instrucciones: Copia el bloque "Prompt para la IA" de la tarea actual y pégalo en el chat. Verifica el resultado antes de pasar a la siguiente.

FASE 1: El Lienzo en Blanco
Objetivo: Tener el proyecto creado y limpio, sin ruido.

[x] Tarea 1.1: Crear el proyecto
Descripción: Generar la carpeta del proyecto con Next.js (tfmv1, TypeScript, ESLint, App Router, src/, no Tailwind).

Prompt para la IA:

"Ejecuta el comando para crear una app Next.js llamada 'tfmv1' usando TypeScript, ESLint, y SIN Tailwind CSS. Usa src/ directory y App Router. No quiero que modifiques nada más, solo la instalación inicial."

[ ] Tarea 1.2: Limpieza Inicial (Hola Mundo)
Descripción: Borrar el contenido por defecto de Next.js para tener una pantalla blanca.

Prompt para la IA:

"Borra todo el contenido de src/app/page.tsx y déjalo solo con un div que diga '<h1>TFMv1 - Inicio</h1>'. Limpia también los estilos por defecto en src/app/globals.css manteniendo solo las directivas de Tailwind."

[ ] Tarea 1.3: Instalar Shadcn/UI (Librería de Diseño)
Descripción: Configurar la base de los componentes visuales.

Prompt para la IA:

"Inicializa shadcn-ui en el proyecto. Configúralo con el estilo 'New York', color 'Zinc', y soporte para variables CSS. Una vez instalado, añade el componente Button a la librería (npx shadcn-ui@latest add button) y pon un botón de prueba en page.tsx que diga 'Click me'."

FASE 2: La Memoria (Base de Datos)
Objetivo: Guardar un dato simple en el navegador.

[ ] Tarea 2.1: Configurar Dexie.js
Descripción: Instalar la librería y crear el archivo de conexión.

Prompt para la IA:

"Instala dexie y dexie-react-hooks. Crea un archivo src/lib/db.ts. Define una clase ChatDatabase que extienda de Dexie. Por ahora, define solo una tabla llamada conversations con los campos ++id, title, createdAt."

[ ] Tarea 2.2: Prueba de Escritura
Descripción: Comprobar que podemos guardar algo en la base de datos.

Prompt para la IA:

"En page.tsx, añade una función simple llamada createTestChat. Al hacer click en el botón, debe guardar una nueva entrada en la tabla conversations con el título 'Mi primer chat'. Usa console.log para confirmar que se guardó."

[ ] Tarea 2.3: Prueba de Lectura
Descripción: Mostrar en pantalla lo que hemos guardado.

Prompt para la IA:

"Usa el hook useLiveQuery de dexie-react-hooks en page.tsx. Haz que lea todas las conversations de la base de datos y las muestre en una lista <ul> debajo del botón. Así podré ver cómo aparece el chat nuevo cada vez que hago click."

FASE 3: Estructura del Chat
Objetivo: Crear la apariencia visual del chat.

[ ] Tarea 3.1: Componente de Input (Entrada de texto)
Descripción: Crear la caja donde el usuario escribe.

Prompt para la IA:

"Crea un nuevo componente src/components/chat/ChatInput.tsx. Debe tener un textarea y un botón de enviar. Usa los componentes de Shadcn (Textarea, Button). Asegúrate de que el componente reciba una prop onSend para devolver el texto al padre."

[ ] Tarea 3.2: Componente de Lista de Mensajes
Descripción: El área donde aparecen los bocadillos de texto.

Prompt para la IA:

"Crea un componente src/components/chat/MessageList.tsx. Debe recibir un array de mensajes (con role y content) y mostrarlos. Si el rol es 'user', alinea el mensaje a la derecha (azul). Si es 'assistant', a la izquierda (gris)."

[ ] Tarea 3.3: Unir las piezas (Layout)
Descripción: Poner el Input y la Lista en la página principal.

Prompt para la IA:

"Limpia page.tsx. Monta una estructura básica: Un contenedor principal con MessageList ocupando el centro y ChatInput fijo en la parte inferior. Crea un estado local messages (useState) con datos falsos para ver cómo queda el diseño."

FASE 4: Lógica de Conversación
Objetivo: Que la IA 'responda' (aunque sea mentira al principio).

[ ] Tarea 4.1: Tabla de Mensajes
Descripción: Necesitamos guardar los mensajes, no solo los chats.

Prompt para la IA:

"Modifica src/lib/db.ts. Añade una nueva tabla llamada messages con el esquema ++id, conversationId, role, content, createdAt. Actualiza la versión de la base de datos."

[ ] Tarea 4.2: Servicio de "IA Falsa" (Mock)
Descripción: Simular que una IA nos responde para probar el flujo sin gastar dinero.

Prompt para la IA:

"Crea un archivo src/core/ai/mock-provider.ts. Crea una función generateMockResponse(text) que espere 1 segundo y devuelva 'Soy una IA simulada, he recibido tu mensaje: ' + text."

[ ] Tarea 4.3: El Flujo Completo
Descripción: Escribir -> Guardar -> Responder Falso -> Guardar.

Prompt para la IA:

"En page.tsx, conecta todo: 1. Al enviar en ChatInput, guarda el mensaje del usuario en Dexie. 2. Llama a generateMockResponse. 3. Guarda la respuesta de la IA en Dexie. 4. Asegúrate de que MessageList se actualice solo gracias a useLiveQuery."

FASE 5: IA Real
Objetivo: Conectar el cerebro real.

[ ] Tarea 5.1: Configurar Vercel AI SDK
Descripción: Instalar las herramientas de IA reales.

Prompt para la IA:

"Instala la librería ai de Vercel y @ai-sdk/openai. Crea un archivo .env.local y dime qué variable de entorno necesito poner para mi clave de API de OpenAI."

[ ] Tarea 5.2: Crear la API Route
Descripción: El puente entre tu chat y OpenAI.

Prompt para la IA:

"Crea una ruta de API en src/app/api/chat/route.ts. Debe usar streamText del AI SDK para reenviar los mensajes a OpenAI y devolver la respuesta en streaming."

[ ] Tarea 5.3: Conectar Frontend a Backend
Descripción: Sustituir la IA falsa por la real.

Prompt para la IA:

"Sustituye la función de Mock en page.tsx por el hook useChat de la librería ai/react. Configúralo para que, al recibir nuevos trozos de texto (streaming), vaya actualizando la vista."