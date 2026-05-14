import { Metadata } from 'next';
import ServiciosClient from './ServiciosClient';

export const metadata: Metadata = {
  title: 'Catálogo de Pagos y Convenios | PagoExpress Loja',
  description: 'Explora más de 300 convenios de pago habilitados en PagoExpress. Pagos de educación, catálogos, seguros, impuestos y más con acreditación inmediata.',
  keywords: ['Convenios de pago Loja', 'Pago de servicios Ecuador', 'Pensiones educativas Loja', 'Aportes IESS Loja', 'PagoExpress'],
};

export default function ServiciosPage() {
  return (
    <>
      <ServiciosClient />
      <div style={{ 
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }} 
      aria-hidden="true">
        <h1>Centro de Pagos, Recaudaciones y Convenios en Loja - PagoExpress</h1>
        <p>
            PagoExpress se consolida como el <strong>ecosistema financiero más completo de Loja</strong>, ofreciendo a nuestros usuarios la posibilidad de cancelar cientos de servicios diferentes en una sola transacción. Nuestra plataforma tecnológica integra convenios nacionales y regionales para su comodidad.
        </p>

        <h2>Categorías de Pago Disponibles</h2>
        <ul>
            <li><strong>Educación y Universidades:</strong> Pago de pensiones escolares, matrículas en la UTPL, UNL y centros de idiomas.</li>
            <li><strong>Venta por Catálogo:</strong> Recaudación para Yanbal, Avon, Belcorp, Natura y más empresas de venta directa.</li>
            <li><strong>Seguridad Social y Salud:</strong> Aportes voluntarios al IESS, fondos de reserva y pagos a medicina prepagada.</li>
            <li><strong>Seguros y Previsión:</strong> Pago de pólizas de vehículos, vida y servicios exequiales.</li>
            <li><strong>Trámites Gubernamentales:</strong> Tasas de la ANT, citaciones de tránsito, certificados del Registro Civil y multas del SRI.</li>
        </ul>

        <h2>Beneficios de Nuestra Red de Convenios</h2>
        <p>
            Al centralizar sus pagos en PagoExpress, usted ahorra tiempo y dinero. No necesita desplazarse a diferentes puntos de la ciudad; nuestra <strong>acreditación inmediata</strong> asegura que sus servicios no se suspendan y que sus obligaciones legales se cumplan dentro de los plazos establecidos.
        </p>

        <h2>Soporte y Consultas de Convenios</h2>
        <p>
            Si tiene dudas sobre un código de pago o no encuentra su convenio en el buscador, nuestro personal capacitado en las agencias de la <strong>Miguel Riofrío</strong> y <strong>Colón</strong> le brindará asesoría personalizada. También puede gestionar sus consultas a través de nuestros canales digitales oficiales.
        </p>

        <h2>Garantía de Pago</h2>
        <p>
            Cada pago realizado en nuestra red está respaldado por un <strong>sistema de auditoría en tiempo real</strong>. Emitimos comprobantes electrónicos y físicos válidos ante cualquier entidad receptora, brindándole la tranquilidad de que sus finanzas están en buenas manos.
        </p>
      </div>
    </>
  );
}
