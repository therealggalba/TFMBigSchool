import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '20px'
    }}>
      <h1>TFMv1 - Inicio</h1>
      <Link href="/dummy-chat" style={{
        padding: '12px 24px',
        backgroundColor: '#8E23FA',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}>
        Ir al Chat de Prueba (Llama-3)
      </Link>
    </main>
  );
}
