=== King Pearl ===
Contributors: kingpearl
Requires at least: 5.9
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Tema a medida para King Pearl — perlas explosivas de fruta real (Ecuador).

== Description ==

Landing inmersiva bilingüe (ES/EN) para King Pearl: hero púrpura real, catálogo
interactivo de 7 sabores, secciones de usos y recetas, reseñas y contacto por
WhatsApp. El tema empaqueta la web original de King Pearl (app de una sola
página renderizada con JavaScript puro, sin dependencias) como tema de
WordPress.

Cómo funciona:

* `index.php` sirve el contenedor `#root`; `app.js` renderiza toda la página y
  navega con rutas hash (`#/`, `#/usos`, `#/recetas`, `#/nosotros`), así que
  cualquier URL de WordPress muestra la app.
* Los textos, sabores y datos de contacto NO se editan desde el editor de
  WordPress: viven en `data.js` (objetos `FLAVORS`, `I18N` y `CONTACT`).
* El formulario de contacto envía por AJAX a formsubmit.co hacia el correo
  definido en `CONTACT.email` dentro de `data.js`. No requiere plugins.
* El botón flotante de WhatsApp está en `footer.php`.

== Installation ==

1. En el escritorio de WordPress ve a Apariencia → Temas → Añadir nuevo →
   Subir tema.
2. Sube el archivo `king-pearl.zip` y pulsa "Instalar ahora".
3. Activa el tema. No necesita configuración adicional.

Instalación manual: descomprime el zip y copia la carpeta `king-pearl` dentro
de `wp-content/themes/`.

== Customization ==

* Datos de contacto (WhatsApp, correo, dirección, redes): edita el objeto
  `CONTACT` al final de `data.js`.
* Sabores y precios: edita `FLAVORS` y `PRICE` al inicio de `data.js`.
* Textos ES/EN: edita `I18N` en `data.js`.
* Número del botón flotante de WhatsApp: edita `footer.php`.
* Favicon: usa Apariencia → Personalizar → Identidad del sitio (si no defines
  uno, el tema usa la corona negra por defecto).

== Changelog ==

= 1.0.0 =
* Primera versión: empaqueta la landing estática de King Pearl como tema de
  WordPress (rutas de imágenes servidas desde el directorio del tema vía
  `window.KP_BASE`, fuentes de Google encoladas, preloads y favicon portados,
  ajuste para la barra de administración).
