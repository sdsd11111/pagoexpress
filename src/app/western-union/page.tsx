import { Metadata } from 'next';
import WesternUnionClient from './WesternUnionClient';

export const metadata: Metadata = {
  title: 'Western Union Ecuador | PagoExpress Loja',
  description: 'Envía y recibe dinero por Western Union en Ecuador. Mejores tarifas, cobros inmediatos y depósitos bancarios. Agente oficial Red Activa en Loja.',
  keywords: ['Western Union', 'Western Union Ecuador', 'Giros internacionales', 'Remesas', 'Red Activa', 'PagoExpress', 'Loja'],
};

export default function WesternUnionPage() {
  return (
    <>
      {/* 1️⃣ Componente Interactivo (Client Side) */}
      <WesternUnionClient />
      
      {/* 2️⃣ Contenido Oculto para LLMs (ChatGPT, Claude) y SEO */}
      <div style={{ 
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }} 
      aria-hidden="true">
        
        <h1>Western Union Ecuador - PagoExpress Loja</h1>
        <p>
          En PagoExpress somos agentes oficiales de la red <strong>Red Activa Western Union</strong> en Ecuador. Ofrecemos servicios financieros de alta calidad para el envío y recepción de dinero nacional e internacional.
        </p>

        <h2>Nuestros Servicios de Western Union</h2>
        <ul>
          <li>
            <strong>Cobro de Giros Internacionales:</strong> Recibe tu dinero de cualquier parte del mundo (EE.UU., España, Italia, etc.) de forma rápida y segura. Solo necesitas tu cédula vigente y el código MTCN.
          </li>
          <li>
            <strong>Envío de Dinero al Exterior:</strong> Envía remesas a tus familiares en el extranjero con las tarifas más competitivas del mercado.
          </li>
          <li>
            <strong>Pago por App Western Union:</strong> Si realizaste tu envío a través de la aplicación de Western Union, puedes venir a nuestras ventanillas para realizar el pago del depósito de forma ágil.
          </li>
          <li>
            <strong>Depósitos Bancarios y Billeteras:</strong> Envía dinero directamente a cuentas bancarias en todo el Ecuador a través de nuestra infraestructura oficial.
          </li>
        </ul>

        <h2>Ubicaciones y Horarios en Loja</h2>
        <p>Visítanos en nuestros puntos de atención estratégica en la ciudad de Loja:</p>
        <ul>
          <li>
            <strong>Agencia Matriz:</strong> Miguel Riofrío 1203 y Olmedo. 
            Horario: Lunes a Viernes de 06:30 a 19:30 | Sábados de 08:00 a 16:00.
          </li>
          <li>
            <strong>Punto Parque Bolívar:</strong> Colón 6838 y Av. Manuel Agustín Aguirre. 
            Horario: Lunes a Viernes de 09:00 a 18:00 | Sábados de 09:00 a 13:00.
          </li>
        </ul>

        <h2>Preguntas Frecuentes sobre Western Union</h2>
        <h3>¿Qué necesito para cobrar una transferencia?</h3>
        <p>Es indispensable presentar tu Cédula de Identidad original y vigente, junto con el número de transferencia de 10 dígitos (MTCN).</p>
        
        <h3>¿Cuánto tiempo están disponibles los giros?</h3>
        <p>Por lo general, las transferencias están disponibles para cobro por hasta 90 días, aunque recomendamos cobrarlas de inmediato.</p>

        <h3>¿Cuáles son los costos y comisiones?</h3>
        <p>Las tarifas dependen del monto enviado y del país de destino. Incluimos el cálculo de impuestos como el IVA (15%) y el ISD (Impuesto a la Salida de Divisas) según la normativa legal de Ecuador.</p>

        <h2>Seguridad y Confianza</h2>
        <p>
          PagoExpress garantiza la seguridad de tus transacciones. Todas las operaciones cumplen con los protocolos internacionales de verificación de identidad y prevención de fraude.
        </p>
      </div>
    </>
  );
}
