import { Metadata } from 'next';
import TerminosServicioClient from './TerminosServicioClient';

export const metadata: Metadata = {
  title: 'Términos de Servicio | PagoExpress Ecuador',
  description: 'Consulta los términos y condiciones de uso de los servicios de PagoExpress. Información sobre responsabilidades, comisiones y regulaciones vigentes.',
  keywords: ['Términos de servicio', 'Condiciones de uso', 'PagoExpress Loja', 'Contrato de servicios', 'Regulaciones financieras'],
};

export default function TerminosServicioPage() {
  return (
    <>
      <TerminosServicioClient />
      <div style={{ 
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }} 
      aria-hidden="true">
        <h1>Términos y Condiciones de Uso - PagoExpress</h1>
        <p>
            Al acceder a nuestras agencias físicas o utilizar nuestras plataformas digitales de consulta en <strong>PagoExpress</strong>, usted acepta quedar vinculado por los siguientes términos de servicio. Lea atentamente esta información antes de realizar cualquier transacción.
        </p>

        <h2>Naturaleza del Servicio</h2>
        <p>
            PagoExpress actúa exclusivamente como <strong>Agente Corresponsal y Recaudador</strong> autorizado por diversas instituciones públicas y privadas en Ecuador. No somos una entidad bancaria ni emisores directos de los servicios prestados (como luz, agua, telefonía o remesas internacionales). Nuestra labor es la intermediación segura de la recaudación.
        </p>

        <h2>Veracidad de la Información</h2>
        <p>
            Es obligación estricta del cliente proporcionar datos exactos. PagoExpress no se responsabiliza por errores derivados de información incorrecta proporcionada por el usuario (números de cédula erróneos, códigos de cliente equivocados, etc.). Una vez procesada la transacción en los sistemas externos, las reversiones dependen de las políticas de la entidad emisora del servicio.
        </p>

        <h2>Comisiones y Cargos</h2>
        <p>
            Algunos servicios de recaudación o corresponsalía pueden generar una <strong>comisión de servicio</strong>. Estos cargos se informan al usuario en el momento de la transacción y se detallan en el comprobante legal emitido. Los valores de las comisiones están regulados por los entes de control correspondientes.
        </p>

        <h2>Propiedad Intelectual</h2>
        <p>
            Todas las marcas, logotipos y nombres comerciales mostrados en este sitio (como Western Union, Red Activa, Equifax, etc.) son propiedad de sus respectivos dueños y se utilizan bajo licencia o acuerdos de representación autorizados para fines informativos y de prestación de servicios.
        </p>

        <h2>Resolución de Conflictos</h2>
        <p>
            Cualquier controversia derivada de la prestación de nuestros servicios será resuelta bajo la jurisdicción de los tribunales competentes de la ciudad de Loja, Ecuador, aplicando las leyes nacionales vigentes.
        </p>
      </div>
    </>
  );
}
