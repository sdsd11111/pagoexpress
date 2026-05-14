import { Metadata } from 'next';
import RecargasClient from './RecargasClient';

export const metadata: Metadata = {
  title: 'Recargas en Loja | Celulares, Juegos y Streaming | PagoExpress',
  description: 'Recarga saldo para Claro, Movistar, Tuenti, CNT. Compra diamantes para Free Fire, pavos de Fortnite, Robux y suscripciones de Netflix en Loja. ¡Activación inmediata!',
  keywords: ['Recargas celulares Loja', 'Diamantes Free Fire Ecuador', 'Suscripción Netflix Ecuador', 'Recargas Movistar', 'Recargas Claro', 'PagoExpress'],
};

export default function RecargasPage() {
  return (
    <>
      {/* 1️⃣ Componente Interactivo (Client Side) */}
      <RecargasClient />
      
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
        
        <h1>Recargas Electrónicas y Digitales en Loja - PagoExpress</h1>
        <p>
          En PagoExpress Loja, ofrecemos el servicio de <strong>recargas electrónicas inmediatas</strong> para todas las operadoras de telefonía móvil en Ecuador, así como pines y recargas directas para las plataformas de entretenimiento y videojuegos más populares del mundo.
        </p>

        <h2>Recargas de Telefonía Móvil</h2>
        <p>Mantente siempre comunicado con nuestros servicios de recarga para:</p>
        <ul>
            <li><strong>Claro:</strong> Saldo, paquetes de datos, redes sociales ilimitadas y combos prepago.</li>
            <li><strong>Movistar:</strong> Recargas de saldo y los mejores paquetes de navegación y minutos.</li>
            <li><strong>Tuenti:</strong> Compra de combos y comodines con gigas libres y Spotify ilimitado.</li>
            <li><strong>CNT:</strong> Recargas para telefonía móvil y fija, planes de internet y televisión.</li>
            <li><strong>Maxiplus y Akimovil:</strong> Soporte completo para operadoras virtuales con beneficios exclusivos.</li>
        </ul>

        <h2>Gaming y Videojuegos (PINES y Recargas Directas)</h2>
        <p>Somos el punto favorito de los gamers en Loja. Recarga tus juegos sin necesidad de tarjeta de crédito:</p>
        <ul>
            <li><strong>Free Fire:</strong> Recarga de diamantes directa a tu ID de jugador.</li>
            <li><strong>Roblox:</strong> Créditos y tarjetas de regalo para Robux.</li>
            <li><strong>Fortnite:</strong> Monedas V-Bucks para skins y pases de batalla.</li>
            <li><strong>Steam, Xbox y PlayStation Store:</strong> Tarjetas de regalo (Gift Cards) para comprar juegos y complementos.</li>
            <li><strong>Mobile Legends, PUBG y Call of Duty:</strong> Monedas virtuales para pases de temporada y mejoras.</li>
        </ul>

        <h2>Streaming y Entretenimiento</h2>
        <p>Disfruta de tus series y películas favoritas con activación al instante:</p>
        <ul>
            <li><strong>Netflix:</strong> Cuentas y pantallas con pago en efectivo o transferencia.</li>
            <li><strong>Plex:</strong> Suscripciones premium para tu biblioteca multimedia.</li>
            <li><strong>Apple Gift Cards:</strong> Saldo para iCloud, Apple Music y App Store.</li>
        </ul>

        <h2>Ventajas de Recargar en PagoExpress</h2>
        <p>
            Olvídate de las complicaciones de los pagos en línea. En nuestras agencias puedes pagar en <strong>efectivo</strong> y recibir tu confirmación o código de inmediato. Es la forma más segura de controlar tus gastos sin suscripciones automáticas.
        </p>

        <h2>¿Cómo funciona el servicio?</h2>
        <ol>
            <li>Elige el servicio o juego que deseas recargar.</li>
            <li>Proporciónanos tu número de teléfono, ID de jugador o correo electrónico.</li>
            <li>Realiza el pago y recibe tu confirmación al instante.</li>
        </ol>

        <h2>Ubicación en Loja</h2>
        <p>Te esperamos en nuestra matriz en la <strong>Miguel Riofrío y Olmedo</strong>, el centro de servicios más completo de la ciudad.</p>
      </div>
    </>
  );
}
