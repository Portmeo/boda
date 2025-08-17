# 💒 Landing Page de Boda - Javier & Mari Ángeles

Landing page minimalista y elegante para boda con video de YouTube integrado, navegación suave, iconografía SVG profesional y formulario de confirmación con Google Forms.

## 🎨 Diseño Minimalista Elegante

- **Paleta**: Grises elegantes (#2C2C2C), dorado sutil (#D4AF37), blanco limpio
- **Tipografía**: Cormorant Garamond (títulos) + Inter (texto)
- **Características**:
  - Video de YouTube con reproducción automática
  - Iconografía SVG profesional en color dorado
  - Diseño limpio y moderno
  - Navegación suave con anchors
  - Imagen de fondo estática en blanco y negro
  - Efectos de difuminado lateral
  - Formulario RSVP integrado con Google Forms

## ✨ Características Principales

### Video de YouTube Integrado
- **Reproducción automática** al hacer clic en "Descúbrelo"
- **API de YouTube Player** para control avanzado
- **Transición suave** a contenido principal al finalizar
- **Responsive** con aspect ratio 16:9
- **Detección de finalización** automática

### Iconografía SVG Profesional
- **Anillos de boda** para la ceremonia
- **Copas de champán** para la celebración  
- **Caja de regalo** para la sección de regalos
- **Color dorado** (#D4AF37) aplicado directamente en los SVG
- **Tamaños optimizados** (32px para anillos y copas, 24px para regalos)

### Sistema de Variables CSS
```css
:root {
  --primary-color: #2C2C2C;     /* Gris principal */
  --accent-color: #D4AF37;      /* Dorado de acento */
  --background-primary: #FFFFFF; /* Fondo principal */
  --background-secondary: #FAFAFA; /* Fondo secundario */
  --text-primary: #1A1A1A;     /* Texto principal */
  --text-secondary: #666666;   /* Texto secundario */
  --border-color: #E5E5E5;     /* Color de bordes */
}
```

### Navegación Inteligente
- **Logo clickeable** que hace scroll al top
- **Menú responsive** con hamburger en mobile
- **Estados activos** según la sección visible
- **Scroll suave** entre secciones con padding adaptativo
- **Cierre automático** del menú mobile al navegar

### Imagen de Fondo Estática
- **Blanco y negro** con filtro grayscale(100%)
- **Difuminado lateral** para mejor integración
- **Responsive**: imagen-mobile.png en dispositivos móviles
- **Posicionada debajo del navbar** en todas las resoluciones
- **object-fit: contain** para mostrar imagen completa

## 🚀 Instalación y Uso

1. **Clonar o descargar** los archivos
2. **Crear carpeta assets** y mover todos los archivos multimedia
3. **Abrir index.html** en un navegador
4. **Personalizar variables CSS** para cambiar colores y tipografías

### Estructura de Archivos
```
boda/
├── index.html                    # Landing page principal
├── styles.css                   # Estilos minimalistas
├── script.js                    # JavaScript simplificado
├── assets/                      # Carpeta de archivos multimedia
│   ├── imagen.png              # Imagen estática desktop
│   ├── imagen-mobile.png       # Imagen estática mobile
│   ├── musica.mp3              # Audio de fondo
│   ├── anillos.svg             # Icono anillos (ceremonia)
│   ├── copas.svg               # Icono copas (celebración)
│   ├── regalos.svg             # Icono regalos
│   ├── iglesia.jpg             # Foto iglesia (600x450px)
│   └── injupisa.jpg            # Foto sede celebración (600x450px)
└── README.md                    # Documentación
```

## 🎥 Video de YouTube

### Configuración del Video
1. **ID del video**: Configurado en `script.js` (variable `youtubeVideoId`)
2. **Reproducción automática** con audio habilitado
3. **Detección de finalización** para transición automática
4. **Sin sugerencias** de videos relacionados (minimizadas)

### Responsive Video
- **Desktop**: Pantalla completa con controles
- **Mobile**: Adaptación perfecta al viewport
- **Aspect ratio preservado** en todas las resoluciones

## 🎨 Personalización de Colores

### Paleta Principal
```css
:root {
    --primary-color: #2C2C2C;     /* Títulos y elementos principales */
    --accent-color: #D4AF37;      /* Dorado para iconos y acentos */
    --text-primary: #1A1A1A;     /* Texto principal */
    --text-secondary: #666666;    /* Texto secundario */
    --background-primary: #FFFFFF; /* Fondo principal */
    --background-secondary: #FAFAFA; /* Fondo secciones alternas */
}
```

## 📱 Responsive Design

### Desktop (>768px)
- **Imágenes**: 600px ancho, 450px alto
- **Navegación**: Horizontal con hover effects
- **Imagen de fondo**: Difuminado lateral para mejor integración

### Mobile (≤768px)
- **Imágenes**: 100% ancho, 250px alto
- **Navegación**: Hamburger menu
- **Imagen de fondo**: imagen-mobile.png optimizada
- **Padding reducido**: Mejor uso del espacio
- **Centrado**: Botones y elementos principales

## 🌟 Características Técnicas

### JavaScript Simplificado
- **Sin frameworks** externos
- **YouTube Player API** para control de video
- **Navegación suave** nativa del navegador
- **Audio de fondo** con volumen controlado (25%)
- **Estados de scroll** para navegación activa

### CSS Optimizado
- **text-wrap: pretty** para mejor legibilidad
- **scroll-behavior: smooth** para navegación fluida
- **scroll-padding-top** adaptativo por sección
- **Media queries** específicas para diferentes dispositivos
- **Flexbox y Grid** para layouts responsivos

### Accesibilidad
- **Navegación por teclado** funcional
- **Alt texts** en todas las imágenes
- **Contraste suficiente** en todos los textos
- **Formularios semánticamente correctos**

## 🎯 Secciones Incluidas

1. **Pantalla de Bienvenida**: Video interactivo con botón de play
2. **Inicio**: Presentación principal con fecha destacada
3. **Detalles del Evento**: 
   - Ceremonia (Iglesia Cristo Rey, 12:30h)
   - Celebración (Sede Injupisa, Córdoba)
   - Regalos (número de cuenta)
4. **Confirmar Asistencia**: Enlace a Google Forms

## 🔗 Integración con Google Forms

### Formulario RSVP
- **URL configurada** en el enlace "Confirmar Asistencia"
- **Botón elegante** con hover effects
- **Apertura en nueva pestaña** para mejor UX
- **Texto informativo** sobre intolerancias y necesidades especiales

### Características del Botón
- **Estilo outline** con borde dorado
- **Hover effect** que invierte colores
- **Centrado automático** con texto alineado a la izquierda
- **Responsive** en todas las resoluciones

## 💡 Mejoras Implementadas

### Audio de Fondo
- **Música ambiental** que se reproduce tras el video
- **Volumen controlado** al 25% para no ser invasiva
- **Activación automática** al mostrar contenido principal

### Navegación Optimizada
- **Scroll padding** diferenciado por sección
- **Anclas específicas** para mejor posicionamiento
- **Logo funcional** que vuelve al inicio
- **Cierre automático** del menú mobile

### Tipografía Mejorada
- **text-wrap: pretty** para distribución equilibrada
- **font-smoothing** para mejor renderizado
- **Jerarquía consistente** entre todas las secciones

## 🎨 Organización de Assets

Todos los archivos multimedia están organizados en la carpeta `assets/`:
- **Imágenes**: .png, .jpg
- **Iconos**: .svg con color aplicado
- **Audio**: .mp3 optimizado
- **Referencias actualizadas** en HTML y CSS

---

💕 **¡Felicidades por su boda!** 💕

*Landing page desarrollada con tecnologías web modernas y optimizada para la mejor experiencia del usuario en la celebración de Javier & Mari Ángeles - 25 de Octubre, 2025*