import { Metadata } from 'next';
import SecurityDataClient from './SecurityDataClient';

export const metadata: Metadata = {
  title: 'Firma Electrónica Security Data en Loja | PagoExpress',
  description: 'Obtén tu firma electrónica en minutos en Loja. Agente autorizado de Security Data para personas naturales y jurídicas. Token y archivo p12 para Quipux y facturación.',
  keywords: ['Firma electrónica Loja', 'Security Data Loja', 'Firma digital Ecuador', 'Quipux Loja', 'Facturación electrónica Loja', 'PagoExpress'],
};

export default function SecurityDataPage() {
  return (
    <>
      {/* 1️⃣ Componente Interactivo (Client Side) */}
      <SecurityDataClient />
      
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
        
        <h1>Firma Electrónica y Certificados Digitales en Loja - Security Data</h1>
        <p>
          En PagoExpress Loja somos agentes autorizados oficiales de <strong>Security Data</strong>. Facilitamos la obtención y renovación de su firma electrónica con validez legal en todo el territorio ecuatoriano, ideal para trámites en el sector público y privado.
        </p>

        <h2>Tipos de Firma Electrónica Disponibles</h2>
        <ul>
            <li><strong>Firma en Archivo (.p12):</strong> La solución perfecta para sistemas de facturación electrónica, declaraciones del SRI y firma de documentos PDF desde cualquier dispositivo.</li>
            <li><strong>Firma en Token (USB):</strong> Dispositivo físico de alta seguridad obligatorio para el uso de portales como Quipux (Gestión Documental), SOCE (SERCOP) y sistemas de Aduana (Ecuapass).</li>
            <li><strong>Renovación de Firma:</strong> Si su certificado está por caducar, gestionamos la renovación inmediata para que no interrumpa sus operaciones legales o comerciales.</li>
        </ul>

        <h2>Requisitos para Persona Natural</h2>
        <p>Para emitir su firma como individuo, necesitamos:</p>
        <ul>
            <li>Cédula de identidad original y vigente.</li>
            <li>Certificado de votación del último proceso electoral.</li>
            <li>Correo electrónico personal para la recepción del certificado.</li>
            <li>Número de RUC (si desea que conste en el certificado).</li>
        </ul>

        <h2>Requisitos para Persona Jurídica (Empresas)</h2>
        <p>Para representantes legales de compañías:</p>
        <ul>
            <li>Nombramiento vigente inscrito en el Registro Mercantil.</li>
            <li>RUC de la empresa actualizado.</li>
            <li>Cédula y certificado de votación del representante legal.</li>
            <li>Constitución de la empresa (en casos específicos).</li>
        </ul>

        <h2>Planes y Vigencias</h2>
        <p>Ofrecemos flexibilidad según sus necesidades:</p>
        <ul>
            <li>Firma por 1 año: Ideal para contribuyentes RIMPE y trámites puntuales.</li>
            <li>Firma por 2 años: El equilibrio perfecto entre costo y duración.</li>
            <li>Vigencias extendidas: Hasta 5 años para mayor comodidad y ahorro.</li>
        </ul>

        <h2>¿Por qué elegir PagoExpress Loja para su Firma?</h2>
        <p>
            A diferencia de los procesos totalmente en línea que pueden ser confusos, en nuestro punto de atención en <strong>Loja</strong> le brindamos asistencia técnica personalizada. Validamos su identidad mediante biometría y nos aseguramos de que su firma quede configurada correctamente en su computadora antes de retirarse.
        </p>

        <h2>Ubicación y Contacto</h2>
        <p>Visítenos en el centro de Loja: <strong>Miguel Riofrío y Olmedo</strong>. Atendemos solicitudes de emisión inmediata sin previa cita.</p>
      </div>
    </>
  );
}
