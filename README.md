# 💒 Landing Page de Boda - Javier & Maria Angeles

Landing page minimalista y elegante para boda con animaciones CSS avanzadas, video de invitación interactivo que se oculta con scroll, y formulario de confirmación completo.

## 🎨 Diseño Minimalista Elegante

- **Paleta**: Grises elegantes, dorado sutil
- **Tipografía**: Cormorant Garamond + Inter
- **Características**:
  - Video con botón de play y audio
  - Animación de sobre que se abre
  - Diseño limpio y moderno
  - Navegación suave y discreta
  - Círculo de fecha interactivo
  - Timeline de historia vertical
  - Formulario RSVP completo

## ✨ Características Principales

### Animación de Video Scroll
Inspirada en Rockstar Games VI, el video de invitación:
- Se reproduce automáticamente al cargar
- Se oculta gradualmente al hacer scroll
- Transición suave con efectos CSS
- Navbar aparece después del video

### Sistema de Variables CSS
Cada diseño incluye variables personalizables:
```css
:root {
  --primary-color: #8B4F47;
  --secondary-color: #D4AF37;
  --font-heading: 'Playfair Display', serif;
  /* ... más variables */
}
```

### Navegación Inteligente
- Menú fijo que aparece tras el video
- Indicadores activos según la sección
- Scroll suave entre secciones
- Responsive con hamburger menu

### Formularios RSVP Avanzados
- Validación en tiempo real
- Notificaciones personalizadas por tema
- Efectos de envío animados
- Campos para preferencias especiales

## 🚀 Instalación y Uso

1. **Clonar o descargar** los archivos
2. **Abrir cualquier archivo HTML** en un navegador
3. **Personalizar variables CSS** para cambiar colores y tipografías
4. **Tu video debe llamarse** `video.mp4` y estar en la raíz

### Estructura de Archivos
```
boda/
├── index.html                    # Landing page principal
├── styles.css                   # Estilos minimalistas
├── script.js                    # JavaScript interactivo
├── imagen.png                   # Imagen estática del video (opcional)
└── README.md                    # Documentación del proyecto
```

## 🎥 Video de Invitación

Ahora utiliza YouTube para el video de invitación:
1. Sube tu video a YouTube (puede ser privado o no listado)
2. Copia el ID del video desde la URL (ej: de `https://youtu.be/Yy6Wl7zHgWI` el ID es `Yy6Wl7zHgWI`)
3. El video se reproduce automáticamente en pantalla completa
4. Ventajas:
   - **Sin límite de tamaño** de archivo
   - **Carga más rápida** 
   - **Funciona en cualquier dispositivo**
   - **No ocupa espacio** en tu repositorio

### 📱 Responsive Video (16:9)
El video se adapta automáticamente a cualquier pantalla manteniendo su proporción:
- **Desktop**: Se centra y mantiene aspect ratio
- **Móvil vertical**: Se ajusta al ancho de pantalla
- **Móvil horizontal**: Se adapta sin cortarse
- **Tablets**: Escalado proporcional perfecto
- **Fondo negro** en los espacios vacíos para mantener la estética

## 🎨 Personalización de Colores

```css
:root {
    --primary-color: #2C2C2C;     /* Gris principal */
    --accent-color: #D4AF37;      /* Dorado de acento */
    --background-primary: #FFFFFF; /* Fondo principal */
    --background-secondary: #FAFAFA; /* Fondo secundario */
    --text-primary: #1A1A1A;     /* Texto principal */
    --border-color: #E5E5E5;     /* Color de bordes */
}
```

## 📱 Responsive Design

El diseño es completamente responsivo:
- **Desktop**: Experiencia completa con animaciones
- **Tablet**: Adaptación de layouts a columnas
- **Mobile**: Navegación hamburger y layouts verticales

## 🌟 Características Técnicas

### Animaciones CSS Puras
- Transformaciones 3D para las tarjetas
- Transiciones suaves en hover
- Keyframes personalizados
- Efectos de parallax sutiles

### JavaScript Vanilla
- Sin dependencias externas
- Intersection Observer para animaciones
- Smooth scrolling nativo
- Event listeners optimizados

### Accesibilidad
- Navegación por teclado
- Contraste adecuado de colores
- Alt texts para elementos decorativos
- Formularios semánticamente correctos

## 🎯 Secciones Incluidas

1. **Hero/Inicio**: Video + invitación principal
2. **Historia**: Timeline de la relación
3. **Ceremonia**: Detalles del evento religioso
4. **Recepción**: Información de la fiesta
5. **Hospedaje**: Hoteles recomendados (opcional)
6. **Regalos**: Mesa de regalos
7. **RSVP**: Formulario de confirmación
8. **Galería**: Placeholder para fotos (romántico)

## 💡 Consejos de Implementación

### Para el Video
- Usa un video corto y emotivo
- Considera subtítulos o texto overlay
- Optimiza el tamaño del archivo
- Tiene un fallback para conexiones lentas

### Para las Fuentes
- Las fuentes de Google Fonts ya están incluidas
- Considera cargar fuentes localmente para mejor rendimiento
- Ajusta el tamaño de fuente según el contenido real

### Para las Animaciones
- Prueba en diferentes dispositivos
- Considera `prefers-reduced-motion` para accesibilidad
- Las animaciones son suaves y no invasivas

## 🔧 Integración con Backend

Los formularios están preparados para integración:
```javascript
// En script.js - función de envío
const formData = new FormData(this);
const data = Object.fromEntries(formData);

// Aquí puedes enviar a tu backend
fetch('/api/rsvp', {
    method: 'POST',
    body: formData
})
```

## 📧 Soporte

Esta es una landing page estática lista para usar. Para funcionalidades adicionales como:
- Base de datos de invitados
- Envío de emails automatizados
- Galería de fotos dinámica
- Gestión de listas de regalo

Necesitarás integrar con un backend (Node.js, PHP, etc.)

---

💕 **¡Felicidades por su boda!** 💕