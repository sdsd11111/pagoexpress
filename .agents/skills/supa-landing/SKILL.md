---
name: SUPA Landing Page Design Identity
description: Documentación de la identidad visual, estructura y componentes utilizados en la landing page de SUPA para PagoExpress.
---

# Guía de Diseño: Landing Page SUPA (PagoExpress)

Esta skill documenta la estructura, paleta de colores, tipografía y posicionamiento exacto utilizado en la página de SUPA (`/supa`). Esta página sigue los principios de "Agente Autorizado", combinando la autoridad institucional del SUPA con la experiencia de usuario moderna de PagoExpress.

## 🎨 Paleta de Colores

La página utiliza colores institucionales extraídos del portal oficial del Consejo de la Judicatura para generar confianza, combinados con fondos neutros para un diseño limpio:

- **Primary (Azul Oscuro):** `#123453` - Utilizado para los títulos principales (H1, H2), encabezados y fondos de secciones de contraste. Transmite seriedad y autoridad legal.
- **Secondary (Azul Claro):** `#2DABE3` - Utilizado para acentos, iconos, líneas separadoras y botones secundarios. Aporta frescura y dinamismo.
- **Background (Gris Crema Institucional):** `#EBEBEB` - El fondo principal de la página, especialmente en el Hero, replica el tono exacto gris crema de la web oficial del SUPA referenciada en las capturas.
- **Text Body (Gris Pizarra):** `#334155` - Utilizado para los párrafos, mejorando la legibilidad sobre fondos claros.

## 🔡 Tipografía

- **Encabezados (H1, H2, H3):** `Montserrat, sans-serif` - Utilizado exclusivamente para los títulos y destacados para imitar fielmente el diseño de la web oficial del SUPA.
- **Cuerpo (Párrafos, Textos):** `Inter, sans-serif` (o defecto de Tailwind) - Utilizado para la lectura, manteniéndose consistente con las tarjetas y descripciones del resto de PagoExpress.
- **Pesos:** `bold` o `extrabold` (700-900) para H1 y resaltados. `medium` (500) para descripciones y cuerpo de texto.

## 📐 Estructura y Posicionamiento (Layout)

### 1. Hero Section (70vh min)
- **Fondo:** Color crema (`#EBEBEB`) con elementos gráficos sutiles (gradientes decorativos en azul ahumado).
- **Posicionamiento del H1:** Alineado a la izquierda (en pantallas grandes) en una cuadrícula de 2 columnas, o centrado en móviles.
  - **H1 Estilo:** Texto grande (`text-5xl` o `text-6xl`), color `#123453` (Primary), fuente `Montserrat`. El título "SUPA" será destacado.
  - **Subtítulo:** "Sistema Único de Pensiones Alimenticias" subrayado o separado por una línea azul claro (`#2DABE3`).
- **Call to Action (CTA):** Botones estilo "pill" (`rounded-full`). Botón principal en Azul Oscuro (`#123453`) para "Consultar ahora", y secundario/bordeado para "Contactar Asesor".
- **Elemento Visual (Derecha):** Un badge de "Agente Autorizado PagoExpress", gráfico relacional o un mockup del recibo.

### 2. Bento Grid (Servicios)
- Diseño inspirado en tarjetas modernas.
- Fondo de tarjeta blanco (`#FFFFFF`) con bordes suaves (`rounded-2xl`) y sombras sutiles (`shadow-lg`).
- Iconografía en Azul Claro (`#2DABE3`).

### 3. Timeline / Infografía de Pasos
- Flujo vertical u horizontal explicando cómo pagar:
  1. Acércate con tu número de cédula.
  2. Consulta el valor adeudado.
  3. Realiza el pago de forma segura y recibe tu comprobante oficial.

### 4. Aviso Legal
- Ubicado cerca del final o footers.
- Texto pequeño (`text-sm`), color gris, aclarando la naturaleza del servicio como canal de recaudación autorizado.

## ✨ Animaciones (Framer Motion)
- **Fade In Up:** Aplicado en el H1 y las tarjetas del Bento Grid para que aparezcan suavemente cuando el usuario recarga la página o hace scroll.
- **Hover States:** Las tarjetas se elevan ligeramente (`-translate-y-1`) y los botones cambian de opacidad a interactos.
