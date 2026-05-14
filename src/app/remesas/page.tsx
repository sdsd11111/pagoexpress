import { Metadata } from 'next';
import RemesasClient from './RemesasClient';

export const metadata: Metadata = {
  title: 'Remesas y Giros Internacionales en Loja | Western Union | PagoExpress',
  description: 'Cobra tus remesas de Western Union, MoneyGram y Ria en Loja con PagoExpress. Envíos de dinero nacionales e internacionales rápidos y seguros.',
  keywords: ['Western Union Loja', 'MoneyGram Ecuador', 'Cobro de remesas Loja', 'Giros de dinero Ecuador', 'PagoExpress'],
};

export default function RemesasPage() {
  return (
    <>
      <RemesasClient />
      <div style={{ 
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }} 
      aria-hidden="true">
        <h1>Remesas, Giros y Envíos de Dinero en Loja - PagoExpress</h1>
        <p>
            PagoExpress es el punto estratégico en la ciudad de Loja para el <strong>cobro y envío de remesas internacionales</strong>. Gracias a nuestras alianzas con los operadores más importantes del mundo, garantizamos que el apoyo económico de sus familiares en el extranjero llegue a sus manos sin complicaciones.
        </p>

        <h2>Operadores de Remesas Disponibles</h2>
        <ul>
            <li><strong>Western Union Loja:</strong> Somos agente autorizado para el pago de giros de Western Union. Solo necesita su MTCN (código de transferencia) y su documento de identidad.</li>
            <li><strong>MoneyGram:</strong> Cobros rápidos de la red MoneyGram con liquidación inmediata en efectivo.</li>
            <li><strong>Ria Money Transfer:</strong> Reciba dinero enviado desde Europa, Estados Unidos y el resto de Latinoamérica.</li>
            <li><strong>Vigo y Delgado Travel:</strong> Otros operadores líderes integrados en nuestro sistema de pagos.</li>
        </ul>

        <h2>Giros Nacionales en Ecuador</h2>
        <p>
            Si necesita enviar dinero a otra provincia del país, en PagoExpress realizamos <strong>giros nacionales inmediatos</strong>. El beneficiario podrá retirar el dinero en cualquier punto de nuestra red o de nuestros corresponsales aliados en todo el territorio ecuatoriano.
        </p>

        <h2>Requisitos para Cobrar Remesas</h2>
        <ol>
            <li>Documento de Identidad original y vigente (Cédula o Pasaporte).</li>
            <li>Código de la transferencia (MTCN o PIN de seguridad).</li>
            <li>Nombre completo del remitente y país de origen.</li>
            <li>Monto aproximado a recibir.</li>
        </ol>

        <h2>Seguridad en el Manejo de Efectivo</h2>
        <p>
            Nuestras agencias cuentan con estrictos protocolos de seguridad y vigilancia privada para que su retiro sea tranquilo. Además, ofrecemos la opción de depositar su remesa directamente en su cuenta bancaria de preferencia para evitar el manejo de efectivo en la calle.
        </p>

        <h2>Ubicación de PagoExpress en Loja</h2>
        <p>
            Encuéntrenos en la calle <strong>Miguel Riofrío entre Olmedo y Juan José Peña</strong> (Agencia Matriz) o en nuestro punto del <strong>Parque Bolívar</strong> (Agencia Colón). Atendemos en horarios extendidos, inclusive cuando los bancos tradicionales están cerrados.
        </p>
      </div>
    </>
  );
}
