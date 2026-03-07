---
description: Branding rules for PagoExpress service subpages (Agente Autorizado)
---

# Regla de Diseño: Agente Autorizado

Esta skill define cómo deben construirse las 8 páginas de servicios del header para que funcionen como landing pages de un "Agente Autorizado". El objetivo es que cada página se sienta como una extensión oficial de la marca asociada (Western Union, Ecuabet, etc.) pero dentro del ecosistema de PagoExpress.

## Principios Fundamentales

1.  **Mimetismo Visual**: La página debe adoptar la paleta de colores y la tipografía (o equivalentes premium) de la marca asociada de forma dominante.
2.  **Estructura Premium**: Aunque los colores cambien, la calidad del diseño debe ser constante: animaciones fluidas (`framer-motion`), diseño responsivo y estética "wow".
3.  **Identidad Dual**: Debe ser claro que es un servicio de PagoExpress (conservar logo de PagoExpress e información de sucursales) pero actuando como punto oficial de la otra marca.

## Proceso de Implementación por Marca

### 1. Investigación (Browser Subagent)
Antes de codificar, se debe analizar la web oficial de la marca:
-   Extraer códigos Hexadecimales (Primary, Secondary, Accents).
-   Identificar fuentes principales (Headings vs Body).
-   Observar estilos de botones (Radius, Hover effects).
-   Capturar estilos de tarjetas y contenedores.

-   **Botones**: Pill-shaped (`rounded-full`).

### 3. Definición de Identidad (Security Data)
-   **Colores**: `#002855` (Azul Medianoche - Primary), `#97C93E` (Verde Lima - Accent), `#F8FAFC` (Fondo).
-   **Tipografía**: **Montserrat** (Headings) e **Inter** (Body).
-   **Botones**: Bordes redondeados modernos (`rounded-2xl`) con estilo de alta tecnología en verde lima.
-   **Header/Hero**: Fondo oscuro (Midnight Blue) con acentos en Verde Lima para un look premium profesional (Altura 70vh).

### 4. Definición de Identidad (Equifax)
-   **Colores**: `#E31837` (Rojo Equifax - Primary/Alerts), `#002855` (Azul Profundo - Secondary/Trust), `#F2F4F7` (Fondo/Neutral).
-   **Tipografía**: **Inter** (Headings & Body) para una lectura clara de datos técnicos y numéricos.
-   **Botones**: Bordes redondeados sutiles (`rounded-md`) con el Rojo Equifax para las acciones principales.
-   **Header/Hero**: Altura 70vh. Fondo Azul Profundo con acentos en Rojo. Incluye un **Score Meter** animado.

### 3. Anatomía de la Página
-   **Hero Directo**: Fondo de color sólido de la marca (ej. Amarillo WU) con mensaje de autoridad. **Altura obligatoria: 70% del viewport (`min-h-[70vh]`)** para un impacto visual balanceado.
-   **Bento Grid / Cards**: Servicios específicos (ej. Envíos, Cobros).
-   **Infografía de Pasos**: Cómo realizar el trámite en las sucursales de Loja.
-   **Sección de Mapa**: Siempre incluir las sucursales de PagoExpress al final como punto de recaudo.
-   **Aviso Legal**: Disclaimer de autoridad oficial.

## Listado de Marcas a Aplicar
1.  Western Union
2.  Ecuabet (Implementada)
3.  Security Data
4.  Equifax
5.  SUPA
6.  Recargas (Multi-marca)
7.  Planillas (EERSSA/EMAPAL)
8.  Bancos (Pichincha, Guayaquil, etc.)
