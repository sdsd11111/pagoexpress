# 🚀 Plan Maestro de Cambios: Pago Express (Mayo 2026)

Este documento detalla TODOS los requerimientos y cambios solicitados por el cliente (Abel) extraídos de la reunión del 1 de Mayo.

---

## 🤖 1. Chatbot de WhatsApp (Estrategia de Filtro y Derivación)

### Comportamiento y Lógica
- **Desactivación Automática:** Si un operador humano responde manualmente a un chat, el chatbot debe suspenderse durante 1 hora para ese cliente.
- **Redirección Estratégica:** El bot enviará **links específicos** que lleven al cliente al formulario exacto en la web (ej. link directo a "Recargas Free Fire").
- **Gatillos de Handoff (Humano):** El flujo se transfiere al personal humano inmediatamente cuando:
    1. El cliente envía una foto (comprobante de transferencia).
    2. El cliente proporciona datos finales (código de contrato, número de cédula).
    3. El cliente solicita explícitamente hablar con un asesor.
- **Rendimiento:** Optimizar para que las respuestas tarden máximo **5 segundos**.

---

## 💻 2. Rediseño de la Plataforma Web (Experiencia de Usuario)

### A. Sección de Recargas (Categorización Triple)
- **Recargas Celulares:** Claro, Movistar, CNT, Tuenti.
- **Juegos Virtuales:** Foco principal en **Free Fire (Diamantes)**.
- **Suscripciones y Gift Cards:** Prime Video, Plex, Apple, Disney+, etc. (Eliminar Netflix).
- **Flujo Dinámico:** Operadora ➔ Paquete/Monto ➔ Número ➔ Subir Foto Comprobante.

### B. Servicios Básicos (Formularios Dinámicos)
- **Datos Estructurados:** Pedir Ciudad (dropdown), Código de Contrato/Cuenta y Cédula.
- **Iconografía:** Usar iconos minimalistas (Foco = Luz, Grifo = Agua, Teléfono = CNT).
- **Calculadora de Restricciones:** Bloquear montos inválidos antes de enviar al WhatsApp (ej. Jardin Azuayo max $200).

### C. SUPA (Pensiones Alimenticias)
- **Diseño:** Colores institucionales (Azul/Celeste) y logo de la Judicatura.
- **Botones:** "Consultar Valores" (Externo) y "Paga Aquí" (Interno: Código SUPA + Cuotas).

### D. Western Union / Red Activa (3 Canales)
1. **Envío Dinero:** Cotizador integrado (País + Monto = Valor con tarifa).
2. **Envío por App:** Pide código de 6 dígitos.
3. **Cobro de Giros:** Foto cédula (ambos lados) + Código MTCN.

### E. Servicios Bancarios (Unificados)
- **Agrupación:** Pichincha, Guayaquil, Loja, Produbanco, Cooperativas (JEP, Mego, etc.).
- **Acciones:** Depósitos, Pagos de Tarjeta y Préstamos.
- **Transparencia:** Mostrar comisión (ej. $0.39) y límites claramente.

---

## ⚙️ 3. Panel de Administración (Web como Software)

- **Gestor de Banners:** Subir/quitar imágenes del carrusel principal.
- **Editor de Precios:** Actualizar valores de los paquetes de recargas.
- **Buscador de Servicios:** Barra de búsqueda en la web para encontrar servicios en segundos.

---

## 📈 4. SEO, UX y Marketing

- **SEO Técnico:** Etiquetas `H1` claras y `Alt Text` en todas las imágenes.
- **UX Minimalista:** Menos texto, más botones de acción ("PAGA AHORA").
- **Interactividad:** Banners del carrusel clickeables hacia sus flujos correspondientes.
- **Contactos:** WhatsApp más grande y visible en la cabecera.

---

## 🚀 5. Infraestructura y Estabilidad

- **Migración:** De Hostinger a **Hozztum** (Plan 4GB).
- **Mantenimiento:** Limpieza periódica de logs de mensajes en la DB.

---
**Elaborado por:** Antigravity AI
**Fecha:** 4 de Mayo, 2026
