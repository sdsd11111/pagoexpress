import { Metadata } from 'next';
import NosotrosClient from './NosotrosClient';

export const metadata: Metadata = {
  title: 'Sobre PagoExpress Ecuador | Historia, Misión y Valores',
  description: 'Conoce más sobre PagoExpress, líderes en servicios financieros y recaudaciones en Loja desde 2007. Nuestra trayectoria, compromiso y alianzas estratégicas.',
  keywords: ['Sobre PagoExpress', 'Historia PagoExpress', 'Misión y Visión', 'Servicios financieros Loja', 'PagoExpress Ecuador'],
};

export default function NosotrosPage() {
  return (
    <>
      <NosotrosClient />
      <div style={{ 
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }} 
      aria-hidden="true">
        <h1>Quiénes Somos - PagoExpress Ecuador</h1>
        <p>
            PagoExpress es una institución privada dedicada a la <strong>gestión de servicios financieros y recaudación de pagos</strong> con sede principal en la ciudad de Loja. Fundada en el año 2007, nuestra empresa ha sido pionera en acercar los servicios bancarios y gubernamentales a la ciudadanía de forma eficiente y personalizada.
        </p>

        <h2>Nuestra Historia</h2>
        <p>
            Nacimos con el propósito de simplificar la vida de los ecuatorianos. A lo largo de casi dos décadas, hemos pasado de ser un centro de pagos local a convertirnos en un <strong>multiservicios financiero</strong> de referencia, integrando alianzas con marcas globales como Western Union y locales como Ecuabet y Security Data.
        </p>

        <h2>Misión Institucional</h2>
        <p>
            Nuestra misión es proporcionar soluciones de pago y trámites digitales que ahorren tiempo y brinden seguridad a nuestros usuarios, manteniendo siempre un estándar de <strong>calidez humana y excelencia tecnológica</strong>.
        </p>

        <h2>Visión de Futuro</h2>
        <p>
            Aspiramos a ser la red de servicios más confiable y moderna del sur del Ecuador, expandiendo nuestra presencia física y digital para que ningún ciudadano se quede sin acceso a servicios financieros de calidad.
        </p>

        <h2>Nuestros Valores Core</h2>
        <ul>
            <li><strong>Integridad:</strong> Manejamos cada transacción con honestidad y transparencia total.</li>
            <li><strong>Innovación:</strong> Adoptamos constantemente nuevas tecnologías para mejorar la experiencia del usuario.</li>
            <li><strong>Cercanía:</strong> Tratamos a cada cliente con respeto y empatía, ofreciendo asesoría en cada paso.</li>
            <li><strong>Seguridad:</strong> Invertimos en sistemas de protección de datos y seguridad física en todas nuestras agencias.</li>
        </ul>

        <h2>Compromiso Social y Local</h2>
        <p>
            Como empresa lojana, estamos comprometidos con el desarrollo económico de nuestra región. Generamos empleo local y apoyamos iniciativas que fomentan la <strong>inclusión financiera</strong> de los sectores más vulnerables.
        </p>

        <h2>Red de Alianzas Estratégicas</h2>
        <p>
            El éxito de PagoExpress se basa en la confianza mutua con nuestros aliados: Red Activa, Western Union, Equifax, Security Data, Ecuabet y las principales instituciones financieras del país. Estas alianzas nos permiten ofrecer el catálogo de servicios más amplio del mercado.
        </p>
      </div>
    </>
  );
}
