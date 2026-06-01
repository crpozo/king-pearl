/* King Pearl — brand data + bilingual strings. Exposed on window. */
(function () {
  // Flavor lineup. color = signature hue, deep = darker shade, glow = pearl light.
  const FLAVORS = [
    {
      id: 'maracuya', img: 'assets/flavor-maracuya.jpg',
      es: 'Maracuyá', en: 'Passion Fruit',
      color: '#FF9E1B', deep: '#C56A00', glow: '#FFD27A', ink: '#3a1f00',
      descEs: 'Tropical, ácida y vibrante. Una explosión cítrica que despierta cada sentido.',
      descEn: 'Tropical, tangy and vibrant. A citrus burst that wakes up every sense.'
    },
    {
      id: 'cereza', img: 'assets/flavor-cereza.jpg',
      es: 'Cereza', en: 'Cherry',
      color: '#D7263D', deep: '#8E0E22', glow: '#FF6B7E', ink: '#3a0008',
      descEs: 'Dulce y profunda, con el carácter intenso de la cereza bien madura.',
      descEn: 'Sweet and deep, with the bold character of perfectly ripe cherry.'
    },
    {
      id: 'manzana', img: 'assets/flavor-manzana.jpg',
      es: 'Manzana Verde', en: 'Green Apple',
      color: '#7AC70C', deep: '#4F8A00', glow: '#C2F56B', ink: '#1c3300',
      descEs: 'Fresca y crujiente. El verde más refrescante de toda la corona.',
      descEn: 'Fresh and crisp. The most refreshing green in the whole crown.'
    },
    {
      id: 'frambuesa', img: 'assets/flavor-frambuesa.jpg',
      es: 'Frambuesa', en: 'Raspberry',
      color: '#E8245A', deep: '#A40C39', glow: '#FF7AA3', ink: '#3a0016',
      descEs: 'Intensa y jugosa, con ese toque agridulce absolutamente irresistible.',
      descEn: 'Intense and juicy, with that irresistible sweet-tart touch.'
    },
    {
      id: 'arandano', img: 'assets/flavor-arandano.jpg',
      es: 'Arándano', en: 'Blueberry',
      color: '#7B2FBF', deep: '#4A1580', glow: '#B57BEE', ink: '#1f0040',
      descEs: 'Misteriosa y elegante. Antioxidante y llena de color verdaderamente real.',
      descEn: 'Mysterious and elegant. Antioxidant-rich and full of truly royal color.'
    },
    {
      id: 'fresa', img: 'assets/flavor-fresa.jpg',
      es: 'Fresa', en: 'Strawberry',
      color: '#FF3B5C', deep: '#C00E2E', glow: '#FF8198', ink: '#3a0010',
      descEs: 'El clásico que nunca falla. Dulce, roja y perfecta en cada sorbo.',
      descEn: 'The classic that never fails. Sweet, red and perfect in every sip.'
    },
    {
      id: 'mango', img: 'assets/flavor-mango.jpg',
      es: 'Mango', en: 'Mango', isNew: true,
      color: '#FFA516', deep: '#C26C00', glow: '#FFD27A', ink: '#3a2000',
      descEs: 'Nuestro nuevo rey. Carnoso, dulce y absolutamente tropical.',
      descEn: 'Our newest king. Fleshy, sweet and absolutely tropical.'
    }
  ];

  const PRICE = '$17,90';

  const I18N = {
    es: {
      nav: { sabores: 'Sabores', perlas: 'Las Perlas', usos: 'Usos', nosotros: 'Nosotros', contacto: 'Contacto' },
      cta: { quote: 'Cotiza ahora', flavors: 'Ver sabores', wa: 'WhatsApp' },
      hero: {
        kicker: 'Burbujas explosivas · Ecuador',
        line: ['Perlas que', 'Explotan'],
        sub: 'El bubble tea es una refrescante explosión de sabor afrutado, con perlas líquidas que estallan en tu boca en cada sorbo.',
        scroll: 'Desliza'
      },
      marquee: 'Explosión de sabor en cada bocado',
      lineup: { tag: 'La línea', title: 'Explora nuestros sabores', all: 'Todos los sabores' },
      steps: {
        tag: '¿Cómo funcionan?',
        title: 'Tres pasos para la explosión',
        items: [
          ['Muerde', 'La fina membrana cede al primer contacto.'],
          ['Estalla', 'El jugo de fruta real inunda tu paladar.'],
          ['Repite', 'Una explosión que no puedes parar.']
        ]
      },
      flavors: { tag: 'El catálogo', title: 'Siete sabores con corona', sub: 'Elige tu favorito y descubre la explosión.', new: 'Nuevo', from: 'Desde' },
      usos: {
        tag: 'Perfectas para', title: 'Corona lo que quieras',
        items: [
          { t: 'Bebidas', d: 'Bubble tea, sodas, limonadas y cócteles que cobran vida.' },
          { t: 'Postres', d: 'Helados, yogures, cheesecakes y waffles con un toque que estalla.' },
          { t: 'Toppings', d: 'Granizados, frappés y creaciones de barra listas para sorprender.' }
        ]
      },
      features: {
        tag: 'Por qué King Pearl', title: 'Calidad digna de la corona',
        items: [
          { t: 'Perlas que explotan con sabor', d: 'Jugo de fruta real dentro de cada esfera.' },
          { t: 'Ingredientes de alta calidad', d: 'Seleccionados para un sabor consistente.' },
          { t: 'Mantener refrigerado', d: 'Frescura garantizada hasta el último bocado.' },
          { t: 'Para bebidas, postres y más', d: 'Versátiles para cualquier creación.' }
        ]
      },
      about: {
        tag: 'Nosotros', a: 'LA CORONA DE LAS', b: 'PERLAS EN ECUADOR',
        body: 'King Pearl nació para llevar la explosión del bubble tea a cada rincón del país. Seleccionamos fruta real y la encerramos en perlas listas para coronar las creaciones de cafeterías, heladerías y barras de todo el Ecuador.',
        stats: [['7', 'sabores con corona'], ['100%', 'jugo de fruta real'], ['+3', 'ciudades principales']]
      },
      contact: {
        tag: 'Hablemos', title: '¿List@ para coronar tu negocio?',
        body: 'Distribuimos perlas explosivas King Pearl en todo el Ecuador. Escríbenos y cotiza al instante.',
        wa: 'Escríbenos por WhatsApp', email: 'Correo', city: 'Quito · Guayaquil · Cuenca',
        rights: 'Todos los derechos reservados.',
        explore: 'Explora', cols_contact: 'Contacto', cities: 'Ubicación',
        ftTag: 'Burbujas explosivas · Ecuador',
        location: 'Visítanos en Quito',
        access: 'Ingresa por Autos Sierra · 2.º piso · Amplios parqueaderos',
        hoursLabel: 'Horarios',
        hoursLines: ['Lun a Vie · 9:00 – 18:00 h', 'Sáb · 9:30 – 14:00 h'],
        directions: 'Cómo llegar'
      }
    },
    en: {
      nav: { sabores: 'Flavors', perlas: 'The Pearls', usos: 'Uses', nosotros: 'About', contacto: 'Contact' },
      cta: { quote: 'Get a quote', flavors: 'See flavors', wa: 'WhatsApp' },
      hero: {
        kicker: 'Bursting bubbles · Ecuador',
        line: ['Pearls that', 'Burst'],
        sub: 'Bubble tea is a refreshing explosion of fruity flavor, with liquid pearls that pop in your mouth with every sip.',
        scroll: 'Scroll'
      },
      marquee: 'An explosion of flavor in every bite',
      lineup: { tag: 'The lineup', title: 'Explore our flavors', all: 'All products' },
      steps: {
        tag: 'How they work',
        title: 'Three steps to the burst',
        items: [
          ['Bite', 'The thin membrane gives at the first touch.'],
          ['Burst', 'Real fruit juice floods your palate.'],
          ['Repeat', "A burst you can't stop chasing."]
        ]
      },
      flavors: { tag: 'The catalog', title: 'Seven crowned flavors', sub: 'Pick your favorite and discover the burst.', new: 'New', from: 'From' },
      usos: {
        tag: 'Perfect for', title: 'Crown whatever you want',
        items: [
          { t: 'Drinks', d: 'Bubble tea, sodas, lemonades and cocktails that come alive.' },
          { t: 'Desserts', d: 'Ice cream, yogurt, cheesecake and waffles with a bursting touch.' },
          { t: 'Toppings', d: 'Slushies, frappés and bar creations ready to surprise.' }
        ]
      },
      features: {
        tag: 'Why King Pearl', title: 'Quality fit for the crown',
        items: [
          { t: 'Pearls that burst with flavor', d: 'Real fruit juice inside every sphere.' },
          { t: 'High-quality ingredients', d: 'Selected for a consistent taste.' },
          { t: 'Keep refrigerated', d: 'Freshness guaranteed to the last bite.' },
          { t: 'For drinks, desserts & more', d: 'Versatile for any creation.' }
        ]
      },
      about: {
        tag: 'About us', a: 'THE CROWN OF', b: 'PEARLS IN ECUADOR',
        body: 'King Pearl was born to bring the bubble-tea burst to every corner of the country. We select real fruit and seal it inside pearls ready to crown the creations of cafés, ice-cream shops and bars across Ecuador.',
        stats: [['7', 'crowned flavors'], ['100%', 'real fruit juice'], ['+3', 'main cities']]
      },
      contact: {
        tag: "Let's talk", title: 'Ready to crown your business?',
        body: 'We distribute King Pearl bursting pearls across Ecuador. Write to us and get an instant quote.',
        wa: 'Message us on WhatsApp', email: 'Email', city: 'Quito · Guayaquil · Cuenca',
        rights: 'All rights reserved.',
        explore: 'Explore', cols_contact: 'Contact', cities: 'Location',
        ftTag: 'Bursting bubbles · Ecuador',
        location: 'Visit us in Quito',
        access: 'Enter through Autos Sierra · 2nd floor · Ample parking',
        hoursLabel: 'Hours',
        hoursLines: ['Mon–Fri · 9:00 – 18:00', 'Sat · 9:30 – 14:00'],
        directions: 'Get directions'
      }
    }
  };

  const CONTACT = {
    whatsapp: '+593 98 701 5059',
    waLink: 'https://wa.me/593987015059',
    email: 'hola@kingpearl.ec',
    instagram: '@kingpearl.ec',
    igLink: 'https://instagram.com/kingpearl.ec',
    address: 'Av. El Inca E4-239 y Guepi, norte de Quito',
    mapsLink: 'https://maps.app.goo.gl/edLhCx89fENtCMgeA'
  };

  window.KP = { FLAVORS, PRICE, I18N, CONTACT };
})();
