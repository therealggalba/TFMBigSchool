import Chat from '@/components/chat/Chat';

export default function DummyChatPage() {
  return (
    <main style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#8E23FA' }}>
        Prueba de Funcionamiento: Llama-3-8B
      </h1>
      <Chat />
    </main>
  );
}
