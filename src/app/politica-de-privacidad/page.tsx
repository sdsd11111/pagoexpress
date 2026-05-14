import { Metadata } from 'next';
import PoliticaPrivacidadClient from './PoliticaPrivacidadClient';

export const metadata: Metadata = {
  title: 'Política de Privacidad | PagoExpress Ecuador',
  description: 'Conoce cómo PagoExpress protege tus datos personales y financieros en cumplimiento con la Ley Orgánica de Protección de Datos de Ecuador.',
  keywords: ['Privacidad', 'Protección de datos', 'Seguridad financiera', 'Términos legales', 'PagoExpress'],
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <PoliticaPrivacidadClient />
      <div style={{ 
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }} 
      aria-hidden="true">
        <h1>Política de Privacidad y Tratamiento de Datos - PagoExpress</h1>
        <p>
            En <strong>PagoExpress</strong>, valoramos la confianza que deposita en nosotros al utilizar nuestros servicios financieros en Loja y a nivel nacional. Esta política describe cómo manejamos su información personal y financiera de acuerdo con las leyes de la República del Ecuador.
        </p>

        <h2>Cumplimiento con la LOPDP</h2>
        <p>
            Nuestra empresa cumple estrictamente con la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong>. Implementamos medidas técnicas y organizativas para prevenir el acceso no autorizado, la pérdida o la alteración de su información sensible.
        </p>

        <h2>Finalidad de la Recolección de Datos</h2>
        <p>Sus datos personales (como nombres, cédula y números de contacto) son recolectados con las siguientes finalidades:</p>
        <ul>
            <li>Validación de identidad para prevención de lavado de activos (SARLAFT).</li>
            <li>Ejecución de contratos de servicios con terceros (Western Union, Red Activa, etc.).</li>
            <li>Generación de facturación electrónica autorizada por el SRI.</li>
            <li>Notificación de estado de trámites como emisión de firmas electrónicas.</li>
        </ul>

        <h2>Derechos del Titular de los Datos</h2>
        <p>Usted, como usuario de PagoExpress, tiene derecho a:</p>
        <ul>
            <li>Acceder a la información personal que mantenemos sobre usted.</li>
            <li>Solicitar la rectificación de datos inexactos.</li>
            <li>Oponerse al tratamiento de sus datos para fines que no sean estrictamente legales o contractuales.</li>
            <li>Solicitar la eliminación de sus datos una vez cumplidos los plazos legales de conservación de registros financieros.</li>
        </ul>

        <h2>Seguridad en Transacciones</h2>
        <p>
            Utilizamos protocolos de <strong>encriptación de grado bancario</strong> para todas las comunicaciones de datos. Nuestras agencias físicas cuentan con supervisión constante y personal capacitado en ética y manejo confidencial de información. No compartimos su información con terceros para fines comerciales o de marketing sin su consentimiento expreso.
        </p>
      </div>
    </>
  );
}
