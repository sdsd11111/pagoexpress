---
description: Branding rules for PagoExpress Recargas & Digital Services (Multi-brand)
---

# Regla de Diseño: Recargas y Servicios Digitales

Esta skill define la identidad visual para la página `/recargas`, que a diferencia de otras, debe manejar múltiples marcas simultáneamente (Netflix, Spotify, Directv, Movistar, Claro, etc.).

## Identidad Visual

1.  **Paleta de Colores Principal**:
    -   **Fondo**: `#0A0A0A` (Negro profundo) o `#F8FAFC` (Blanco/Gris) dependiendo de la sección.
    -   **Primario PagoExpress**: `#FFD700` (Amarillo) para CTAs globales.
    - **Acentos de Marca**:
        - **Netflix**: `#E50914` (Rojo), `#000000` (Negro).
        - **Spotify**: `#1DB954` (Verde), `#191414` (Negro).
        - **Crunchyroll**: `#F47521` (Naranja), `#FFFFFF` (Blanco).
        - **PlayStation**: `#0070CC` (Azul), `#FFFFFF` (Blanco).
        - **Free Fire**: `#00AEEF` (Azul Diamante), `#1C1C1C` (Negro mate).

2.  **Tipografía**:
    -   **Poppins / Lexend Deca**: Títulos (H1, H2, H3) y acentos tecnológicos.
    -   **Inter**: Textos de cuerpo y descripciones para legibilidad.

## Estructura de la Página

### 1. Hero de Posicionamiento (70vh)
-   **H1**: "Recargas de Netflix, Spotify y Gaming en Loja: Paga en Efectivo sin Tarjeta".
-   **Altura**: Exactamente `h-[70vh]` con `min-h-[550px]`.
-   **Visual**: Composición multimarca dinámica.
-   **Mensaje**: Libertad digital sin necesidad de tarjetas de crédito.

### 2. Secciones Inmersivas por Marca
-   Cada sección debe cambiar el fondo y los acentos para que el usuario sienta que está "dentro" de la marca.
-   **Netflix Section**: Fondo negro, tipografía de impacto, uso de sombras "espejo" o efectos de cartelera.
-   **Spotify Section**: Fondo verde o degradados suaves hacia el negro. Bordes muy redondeados.
-   **Gaming/Free Fire**: Uso de texturas metálicas o resplandores (glows) en los botones.

### 3. Bento Grid Multimarca (Resto de Servicios)
-   Para marcas secundarias o operadoras de telefonía, usar un grid unificado donde el color de acento se aplique en el icono o el borde en hover.

### 4. Infografía de 3 Pasos
-   Mismo estilo visual que SUPA/Equifax para mantener consistencia en la red de PagoExpress.

### 5. Sección de Sucursales
-   Integración obligatoria del `MapSection`.

## Directrices de Diseño (Tecnológico)
-   **Glassmorphism**: Uso extensivo de `backdrop-blur-lg`, `bg-white/5` y `border-white/10`.
-   **Neón**: Sombras de colores vibrantes en hover (`shadow-[0_0_20px_rgba(color,0.2)]`).
-   **Bordes**: `rounded-3xl` para una estética de hardware/apps modernas.
-   **Animaciones**: `framer-motion` con efectos de "Hover Scale" y transiciones suaves.
-   **SEO Local Keywords**: "Recargas Netflix Loja efectivo", "Diamantes Free Fire Loja", "Recargas Claro Movistar Tuenti Loja", "Pagar Spotify sin tarjeta Ecuador".
