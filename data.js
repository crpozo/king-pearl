/* King Pearl — brand data + bilingual strings. Exposed on window. */
(function () {
  // Flavor lineup. color = signature hue, deep = darker shade, glow = pearl light.
  const FLAVORS = [
    {
      id: 'maracuya', img: 'assets/flavor-maracuya.jpg',
      es: 'Maracuyá', en: 'Passion Fruit', rating: 4.7, tagEs: 'Tropical', tagEn: 'Tropical',
      color: '#FF9E1B', deep: '#C56A00', glow: '#FFD27A', ink: '#3a1f00',
      descEs: 'Tropical, ácida y vibrante. Una explosión cítrica que despierta cada sentido.',
      descEn: 'Tropical, tangy and vibrant. A citrus burst that wakes up every sense.'
    },
    {
      id: 'cereza', img: 'assets/flavor-cereza.jpg',
      es: 'Cereza', en: 'Cherry', rating: 4.6, tagEs: 'Fruto rojo', tagEn: 'Red fruit',
      color: '#D7263D', deep: '#8E0E22', glow: '#FF6B7E', ink: '#3a0008',
      descEs: 'Dulce y profunda, con el carácter intenso de la cereza bien madura.',
      descEn: 'Sweet and deep, with the bold character of perfectly ripe cherry.'
    },
    {
      id: 'manzana', img: 'assets/flavor-manzana.jpg',
      es: 'Manzana Verde', en: 'Green Apple', rating: 4.5, tagEs: 'Fresco', tagEn: 'Fresh',
      color: '#7AC70C', deep: '#4F8A00', glow: '#C2F56B', ink: '#1c3300',
      descEs: 'Fresca y crujiente. El verde más refrescante de toda la corona.',
      descEn: 'Fresh and crisp. The most refreshing green in the whole crown.'
    },
    {
      id: 'frambuesa', img: 'assets/flavor-frambuesa.jpg',
      es: 'Frambuesa', en: 'Raspberry', rating: 4.8, tagEs: 'Fruto rojo', tagEn: 'Red fruit',
      color: '#E8245A', deep: '#A40C39', glow: '#FF7AA3', ink: '#3a0016',
      descEs: 'Intensa y jugosa, con ese toque agridulce absolutamente irresistible.',
      descEn: 'Intense and juicy, with that irresistible sweet-tart touch.'
    },
    {
      id: 'arandano', img: 'assets/flavor-arandano.jpg',
      es: 'Arándano', en: 'Blueberry', rating: 4.6, tagEs: 'Fruto rojo', tagEn: 'Berry',
      color: '#7B2FBF', deep: '#4A1580', glow: '#B57BEE', ink: '#1f0040',
      descEs: 'Misteriosa y elegante. Antioxidante y llena de color verdaderamente real.',
      descEn: 'Mysterious and elegant. Antioxidant-rich and full of truly royal color.'
    },
    {
      id: 'fresa', img: 'assets/flavor-fresa.jpg',
      es: 'Fresa', en: 'Strawberry', rating: 4.9, tagEs: 'Fruto rojo', tagEn: 'Red fruit',
      color: '#FF3B5C', deep: '#C00E2E', glow: '#FF8198', ink: '#3a0010',
      descEs: 'El clásico que nunca falla. Dulce, roja y perfecta en cada sorbo.',
      descEn: 'The classic that never fails. Sweet, red and perfect in every sip.'
    },
    {
      id: 'mango', img: 'assets/flavor-mango.jpg',
      es: 'Mango', en: 'Mango', isNew: true, rating: 5.0, tagEs: 'Tropical', tagEn: 'Tropical',
      color: '#FFA516', deep: '#C26C00', glow: '#FFD27A', ink: '#3a2000',
      descEs: 'Nuestro nuevo rey. Carnoso, dulce y absolutamente tropical.',
      descEn: 'Our newest king. Fleshy, sweet and absolutely tropical.'
    }
  ];

  const PRICE = '$17,90';

  const I18N = {
    es: {
      nav: { inicio: 'Inicio', sabores: 'Sabores', perlas: 'Las Perlas', usos: 'Usos', recetas: 'Recetas', nosotros: 'Nosotros', contacto: 'Contacto' },
      home: {
        exploreTag: 'Explora', exploreTitle: 'Descubre más de King Pearl',
        cards: [
          { t: 'Cómo usarlas', d: 'Cantidades, modo de servir y dónde lucen mejor.', href: '#/usos' },
          { t: 'Recetas', d: '9 recetas listas para sorprender a tus clientes.', href: '#/recetas' },
          { t: 'Nosotros', d: 'Quiénes somos y por qué confiar en la corona.', href: '#/nosotros' }
        ]
      },
      cta: { quote: 'Cotiza ahora', flavors: 'Ver sabores', wa: 'WhatsApp' },
      hero: {
        kicker: 'Burbujas explosivas · Ecuador',
        line: ['Perlas que', 'Explotan'],
        sub: [
          'En KING PEARL transformamos cada bebida y postre en una experiencia única. Nuestras perlas explosivas están elaboradas con calidad, sabor y mucha innovación, ideales para cafeterías, confiterías, heladerías, restaurantes, locales de bebidas, postres, donas, emprendimientos y distribuidores.',
          'En KING PEARL seguimos creciendo junto a ustedes.'
        ],
        scroll: 'Desliza'
      },
      marquee: 'Explosión de sabor en cada bocado',
      lineup: {
        tag: 'La línea', title: 'Explora nuestros sabores', all: 'Todos los sabores',
        add: 'Cotiza este sabor', refr: 'Mantener refrigerado', count: 'sabores',
        filters: [
          { id: 'all', label: 'Todos' },
          { id: 'tropical', label: 'Tropicales' },
          { id: 'berry', label: 'Frutos rojos' },
          { id: 'new', label: 'Nuevos' }
        ]
      },
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
      whatare: {
        tag: '¿Qué son?', title: 'Qué son las perlas explosivas',
        body: 'Las perlas explosivas son esferas rellenas de jugo o bebida saborizada que explotan en la boca al morderlas, brindando una experiencia única de sabor, textura y diversión. Son ideales para bebidas, bubble tea, yogures, helados, postres, cócteles y más.',
        benefitsTitle: 'Beneficios de las perlas explosivas',
        benefits: [
          { t: 'Experiencia innovadora', d: 'Aportan una experiencia innovadora y diferente en cada bocado.' },
          { t: 'Mejor presentación', d: 'Elevan la presentación de bebidas y postres al instante.' },
          { t: 'Atraen más clientes', d: 'Llaman la atención por su apariencia colorida y su sabor.' },
          { t: 'Variedad de sabores', d: 'Disponibles en varios sabores y colores para combinar.' },
          { t: 'Fáciles de usar', d: 'Fáciles de preparar y utilizar en cualquier preparación.' },
          { t: 'Ideales para tu negocio', d: 'Perfectas para emprendimientos, cafeterías y negocios de bebidas.' },
          { t: 'Más valor al producto', d: 'Incrementan el valor y el atractivo de tus productos.' }
        ]
      },
      usage: {
        tag: 'Cómo usarlas', title: 'Cómo usarlas correctamente', more: 'Ver guía completa',
        intro: 'Las perlas explosivas deben mantenerse refrigeradas y servirse directamente sobre la bebida o postre. Usa cucharas o utensilios plásticos para conservar su textura y evitar que se revienten o contaminen. Limpia la cuchara después de servir y no la mezcles con otro envase sin limpiarla antes.',
        qtyTitle: 'Cantidad recomendada',
        qty: [['Bebidas medianas', '20 – 30 g'], ['Bebidas grandes', '30 – 50 g'], ['Postres y helados', '30 – 50 g']],
        qtyNote: 'La cantidad puede ajustarse según el gusto del cliente.',
        serveTitle: '¿Cómo servirlas?',
        serve: [
          'Escurre ligeramente el líquido antes de servir.',
          'Colócalas al final de la preparación para mantener su frescura y textura.',
          'Sirve con sorbetes anchos en bebidas tipo bubble tea.',
          'Mantén siempre refrigeradas después de abrir el envase.'
        ],
        drinksTitle: 'Mejores bebidas',
        drinks: ['Bubble tea', 'Té frío', 'Granizados', 'Smoothies', 'Limonadas', 'Yogurt drinks', 'Cócteles y mocktails', 'Bebidas frutales'],
        dessertsTitle: 'Mejores postres',
        desserts: ['Helados', 'Waffles', 'Crepes', 'Yogurt con frutas', 'Cheesecake', 'Ensaladas de frutas', 'Pasteles', 'Gelatinas']
      },
      care: {
        tag: 'Conservación', title: 'Conservación y manipulación',
        body: 'Para mantener la calidad, sabor y textura de las perlas explosivas, sigue estas recomendaciones:',
        items: [
          'Mantén el producto refrigerado entre 2 °C y 8 °C.',
          'Evita la exposición directa al sol o altas temperaturas.',
          'Una vez abierto, conserva el envase siempre bien tapado.',
          'Utiliza utensilios limpios y secos para manipular el producto.',
          'No mezcles con agua caliente.',
          'Consume en el menor tiempo posible tras abrir.',
          'No congeles: puede afectar la textura de las perlas.',
          'Mantén en un lugar limpio y libre de contaminación.',
          'No viertas líquidos dentro del frasco.'
        ],
        note: 'Una correcta conservación mantiene la frescura, el sabor y la experiencia explosiva del producto.'
      },
      recipes: {
        tag: 'Recetas', title: 'Recetas King Pearl',
        intro: 'Las perlas explosivas funcionan mejor en bebidas frías y postres frescos: mejoran la presentación, aumentan el valor del producto y ofrecen una experiencia única al cliente.',
        ingLabel: 'Ingredientes', stepLabel: 'Preparación',
        catDrink: 'Bebida', catDessert: 'Postre', catCocktail: 'Coctel',
        list: [
          { name: 'Bubble Tea Clásico Frutal', cat: 'drink', img: 'assets/rec-bubble-tea.jpg',
            ing: ['250 ml de té frío', '30 ml de jarabe de frutas', 'Hielo', '60 g de perlas explosivas'],
            steps: ['Coloca hielo en el vaso.', 'Agrega el té y el jarabe.', 'Mezcla bien.', 'Añade las perlas al final.', 'Sirve con sorbete ancho.'] },
          { name: 'Limonada Explosiva', cat: 'drink', img: 'assets/rec-limonada.jpg',
            ing: ['Jugo de 2 limones', '300 ml de agua fría', 'Azúcar al gusto', 'Hielo', '50 g de perlas de fresa o maracuyá'],
            steps: ['Mezcla limón, agua y azúcar.', 'Agrega hielo.', 'Incorpora las perlas al final.', 'Decora con una rodaja de limón.'] },
          { name: 'Smoothie Tropical Premium', cat: 'drink', img: 'assets/rec-smoothie.jpg',
            ing: ['1 taza de mango congelado', '½ taza de piña', '200 ml de yogurt o leche', 'Hielo', '60 g de perlas explosivas'],
            steps: ['Licúa las frutas con yogurt y hielo.', 'Sirve en vaso alto.', 'Añade las perlas encima.'] },
          { name: 'Granizado King Pearl', cat: 'drink', img: 'assets/rec-granizado.jpg',
            ing: ['300 ml de bebida frutal', 'Hielo triturado', 'Jarabe al gusto', '70 g de perlas explosivas'],
            steps: ['Licúa el hielo con la bebida.', 'Sirve en vaso grande.', 'Agrega las perlas y crema batida opcional.'] },
          { name: 'Mojito Explosivo', cat: 'cocktail', img: 'assets/rec-mojito.jpg',
            ing: ['Hierbabuena', 'Jugo de limón', 'Agua mineral', 'Ron', 'Hielo', '50 g de perlas explosivas'],
            steps: ['Machaca hierbabuena y limón.', 'Agrega hielo y ron.', 'Completa con agua mineral.', 'Añade las perlas al final.'] },
          { name: 'Yogurt con Perlas', cat: 'dessert', img: 'assets/rec-yogurt.jpg',
            ing: ['Yogurt griego', 'Frutas picadas', 'Granola', '40 g de perlas explosivas'],
            steps: ['Coloca yogurt en un vaso.', 'Agrega frutas y granola.', 'Decora con perlas explosivas.'] },
          { name: 'Waffle Premium', cat: 'dessert', img: 'assets/rec-waffle.jpg',
            ing: ['Waffle preparado', 'Helado', 'Salsa de chocolate', '50 g de perlas explosivas'],
            steps: ['Sirve el waffle caliente.', 'Añade helado y salsa.', 'Decora con perlas explosivas.'] },
          { name: 'Cheesecake Decorativo', cat: 'dessert', img: 'assets/rec-cheesecake.jpg',
            ing: ['Cheesecake individual', 'Salsa de frutas', '30 g de perlas explosivas'],
            steps: ['Decora el cheesecake con salsa.', 'Coloca las perlas encima antes de servir.'] },
          { name: 'Frappé Explosivo', cat: 'drink', img: 'assets/rec-frappe.jpg',
            ing: ['250 ml de leche', 'Café o chocolate', 'Hielo', 'Crema batida', '60 g de perlas explosivas'],
            steps: ['Licúa leche, hielo y saborizante.', 'Sirve frío.', 'Decora con crema y perlas.'] }
        ]
      },
      biz: {
        tag: 'Alianzas', title: 'Beneficios de trabajar con King Pearl',
        items: [
          { t: 'Soporte y Asesoría', d: 'Brindamos acompañamiento constante a nuestros clientes para ayudarles a crecer, mejorar sus productos y ofrecer una mejor experiencia a sus consumidores.' },
          { t: 'Promociones y Estrategias', d: 'Realizamos promociones especiales y campañas que ayudan a impulsar las ventas y atraer nuevos clientes.' },
          { t: 'Activaciones de Marca', d: 'Apoyamos con activaciones en puntos de venta, degustaciones y eventos para dar mayor visibilidad a los negocios y aumentar el impacto de la marca.' },
          { t: 'Material POP', d: 'Ofrecemos material publicitario como banners, stickers, menús, exhibidores y material visual para mejorar la presentación del negocio y fortalecer la imagen de marca.' },
          { t: 'Innovación Constante', d: 'Incorporamos nuevos sabores, ideas y tendencias para que nuestros clientes siempre ofrezcan productos innovadores y atractivos.' },
          { t: 'Calidad y Confianza', d: 'Trabajamos con productos de excelente calidad para garantizar sabor, frescura y satisfacción en cada preparación.' }
        ]
      },
      about: {
        tag: 'Nosotros', a: 'LA CORONA DE LAS', b: 'PERLAS EN ECUADOR',
        pageTitle: 'Nuestra historia', pageSub: 'Conoce la marca que corona bebidas y postres en todo el Ecuador.',
        body: 'King Pearl nació para llevar la explosión del bubble tea a cada rincón del país. Seleccionamos fruta real y la encerramos en perlas listas para coronar las creaciones de cafeterías, heladerías y barras de todo el Ecuador.',
        stats: [['7', 'sabores con corona'], ['100%', 'jugo de fruta real'], ['+3', 'ciudades principales']]
      },
      contact: {
        tag: 'Hablemos', title: '¿List@ para coronar tu negocio?',
        body: 'Distribuimos perlas explosivas King Pearl en todo el Ecuador. Escríbenos y cotiza al instante.',
        wa: 'Escríbenos por WhatsApp', email: 'Correo', city: 'Quito · Guayaquil · Cuenca',
        rights: 'Todos los derechos reservados.',
        explore: 'Explora', cols_contact: 'Contacto', cities: 'Ubicación',
        ftTag: 'Una explosión de sabor en cada burbuja.',
        location: 'Visítanos en Quito',
        showroom: 'Showroom Quito', openNow: 'Abierto ahora', closedNow: 'Cerrado ahora',
        addrLabel: 'Dirección', call: 'Llamar', mapChip: 'Av. El Inca E4–239',
        access: 'Ingresa por Autos Sierra · 2.º piso · Amplios parqueaderos',
        shipLabel: 'Envíos', emailLabel: 'Correo',
        hoursLabel: 'Horarios',
        hoursLines: ['Lun a Vie · 9:00 – 18:00 h', 'Sáb · 9:30 – 14:00 h'],
        directions: 'Cómo llegar',
        thanks: 'Gracias por confiar en KING PEARL. Su apoyo y preferencia nos motivan a seguir innovando y ofreciendo productos de la mejor calidad para hacer crecer juntos cada proyecto y emprendimiento.',
        form: {
          title: 'Escríbenos directo',
          sub: 'Cuéntanos qué necesitas y te respondemos en menos de 24 horas.',
          name: 'Nombre', namePh: 'Tu nombre',
          reach: 'Correo o WhatsApp', reachPh: 'Para poder responderte',
          biz: 'Negocio o ciudad', bizOpt: '(opcional)', bizPh: 'Ej. Cafetería Luna · Quito',
          msg: 'Mensaje', msgPh: '¿Qué sabores te interesan? ¿Cantidades? ¿Ciudad de entrega?',
          send: 'Enviar mensaje',
          note: 'También puedes escribirnos directo por WhatsApp.',
          sending: 'Enviando…',
          ok: '¡Mensaje enviado! Te responderemos muy pronto.',
          err: 'No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp.',
          subject: 'Nuevo mensaje desde el sitio de King Pearl'
        }
      },
      ship: {
        badge: 'Entrega en 24h',
        text: 'Realizamos envíos a todo Quito y a nivel nacional.'
      },
      why: {
        eyebrow: 'Ventajas',
        title: '¿Por qué elegir King Pearl?',
        items: [
          { t: 'Calidad Premium', d: 'Nuestras perlas están elaboradas con los más altos estándares, garantizando una textura perfecta y una explosión de sabor auténtico en cada bocado.' },
          { t: 'Rentabilidad para tu negocio', d: 'El complemento ideal para elevar el valor percibido de tus bebidas, postres y helados, atrayendo a más clientes.' },
          { t: 'Variedad e Innovación', d: 'Una amplia gama de sabores frutales y colores vibrantes que transforman el menú de cualquier negocio en una experiencia visual y deliciosa.' }
        ],
        slogan: 'King Pearl: Una explosión de sabor en cada burbuja.'
      },
      reviews: {
        eyebrow: 'Clientes felices',
        title: 'Lo que dicen nuestros clientes',
        items: [
          { name: 'María Fernanda', biz: 'Cafetería · Quito', text: 'Entrega inmediata: pedí en la mañana y esa misma tarde ya estaba sirviendo bebidas con las perlas.' },
          { name: 'Andrés', biz: 'Heladería · Guayaquil', text: 'Llegó en menos de 24 horas y en perfecto estado. El de maracuyá es el favorito de mis clientes.' },
          { name: 'Daniela', biz: 'Bubble tea · Cuenca', text: 'Súper confiables: siempre la misma calidad y te acompañan en todo el proceso del pedido.' }
        ]
      }
    },
    en: {
      nav: { inicio: 'Home', sabores: 'Flavors', perlas: 'The Pearls', usos: 'Uses', recetas: 'Recipes', nosotros: 'About', contacto: 'Contact' },
      home: {
        exploreTag: 'Explore', exploreTitle: 'Discover more of King Pearl',
        cards: [
          { t: 'How to use them', d: 'Amounts, how to serve and where they shine best.', href: '#/usos' },
          { t: 'Recipes', d: '9 recipes ready to wow your customers.', href: '#/recetas' },
          { t: 'About us', d: 'Who we are and why to trust the crown.', href: '#/nosotros' }
        ]
      },
      cta: { quote: 'Get a quote', flavors: 'See flavors', wa: 'WhatsApp' },
      hero: {
        kicker: 'Bursting bubbles · Ecuador',
        line: ['Pearls that', 'Burst'],
        sub: [
          'At KING PEARL we turn every drink and dessert into a unique experience. Our bursting pearls are crafted with quality, flavor and plenty of innovation — ideal for cafés, candy shops, ice-cream parlors, restaurants, drink and dessert spots, donut shops, ventures and distributors.',
          'At KING PEARL we keep growing together with you.'
        ],
        scroll: 'Scroll'
      },
      marquee: 'An explosion of flavor in every bite',
      lineup: {
        tag: 'The lineup', title: 'Explore our flavors', all: 'All products',
        add: 'Get a quote', refr: 'Keep refrigerated', count: 'flavors',
        filters: [
          { id: 'all', label: 'All' },
          { id: 'tropical', label: 'Tropical' },
          { id: 'berry', label: 'Red fruits' },
          { id: 'new', label: 'New' }
        ]
      },
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
      whatare: {
        tag: 'What are they?', title: 'What bursting pearls are',
        body: 'Bursting pearls are spheres filled with juice or flavored drink that pop in your mouth when you bite them, delivering a unique experience of flavor, texture and fun. They are ideal for drinks, bubble tea, yogurts, ice cream, desserts, cocktails and more.',
        benefitsTitle: 'Benefits of bursting pearls',
        benefits: [
          { t: 'Innovative experience', d: 'They bring an innovative, different experience in every bite.' },
          { t: 'Better presentation', d: 'They instantly elevate the look of drinks and desserts.' },
          { t: 'Attract more customers', d: 'They stand out for their colorful look and flavor.' },
          { t: 'Flavor variety', d: 'Available in several flavors and colors to mix and match.' },
          { t: 'Easy to use', d: 'Easy to prepare and use in any preparation.' },
          { t: 'Great for business', d: 'Perfect for startups, cafés and drink businesses.' },
          { t: 'More product value', d: 'They raise the value and appeal of your products.' }
        ]
      },
      usage: {
        tag: 'How to use', title: 'How to use them correctly', more: 'See full guide',
        intro: 'Bursting pearls must be kept refrigerated and served straight onto the drink or dessert. Use plastic spoons or utensils to preserve their texture and avoid bursting or contamination. Clean the spoon after serving and do not mix it with another container without cleaning it first.',
        qtyTitle: 'Recommended amount',
        qty: [['Medium drinks', '20 – 30 g'], ['Large drinks', '30 – 50 g'], ['Desserts & ice cream', '30 – 50 g']],
        qtyNote: 'The amount can be adjusted to each customer’s taste.',
        serveTitle: 'How to serve them',
        serve: [
          'Lightly drain the liquid before serving.',
          'Add them at the end of the preparation to keep them fresh.',
          'Serve with wide straws in bubble-tea style drinks.',
          'Always keep refrigerated after opening the container.'
        ],
        drinksTitle: 'Best drinks',
        drinks: ['Bubble tea', 'Iced tea', 'Slushies', 'Smoothies', 'Lemonades', 'Yogurt drinks', 'Cocktails & mocktails', 'Fruit drinks'],
        dessertsTitle: 'Best desserts',
        desserts: ['Ice cream', 'Waffles', 'Crepes', 'Fruit yogurt', 'Cheesecake', 'Fruit salads', 'Cakes', 'Jellies']
      },
      care: {
        tag: 'Storage', title: 'Storage & handling',
        body: 'To keep the quality, flavor and texture of the bursting pearls, follow these recommendations:',
        items: [
          'Keep the product refrigerated between 2 °C and 8 °C.',
          'Avoid direct sunlight or high temperatures.',
          'Once opened, always keep the container tightly closed.',
          'Use clean, dry utensils to handle the product.',
          'Do not mix with hot water.',
          'Consume as soon as possible after opening.',
          'Do not freeze: it can affect the pearls’ texture.',
          'Keep in a clean, contamination-free place.',
          'Do not pour liquids into the jar.'
        ],
        note: 'Proper storage keeps the freshness, flavor and bursting experience of the product.'
      },
      recipes: {
        tag: 'Recipes', title: 'King Pearl recipes',
        intro: 'Bursting pearls work best in cold drinks and fresh desserts: they improve presentation, raise the product value and offer a unique customer experience.',
        ingLabel: 'Ingredients', stepLabel: 'Method',
        catDrink: 'Drink', catDessert: 'Dessert', catCocktail: 'Cocktail',
        list: [
          { name: 'Classic Fruit Bubble Tea', cat: 'drink', img: 'assets/rec-bubble-tea.jpg',
            ing: ['250 ml cold tea', '30 ml fruit syrup', 'Ice', '60 g bursting pearls'],
            steps: ['Add ice to the glass.', 'Pour in the tea and syrup.', 'Mix well.', 'Add the pearls at the end.', 'Serve with a wide straw.'] },
          { name: 'Bursting Lemonade', cat: 'drink', img: 'assets/rec-limonada.jpg',
            ing: ['Juice of 2 lemons', '300 ml cold water', 'Sugar to taste', 'Ice', '50 g strawberry or passion-fruit pearls'],
            steps: ['Mix lemon, water and sugar.', 'Add ice.', 'Stir in the pearls at the end.', 'Garnish with a lemon slice.'] },
          { name: 'Tropical Premium Smoothie', cat: 'drink', img: 'assets/rec-smoothie.jpg',
            ing: ['1 cup frozen mango', '½ cup pineapple', '200 ml yogurt or milk', 'Ice', '60 g bursting pearls'],
            steps: ['Blend the fruit with yogurt and ice.', 'Serve in a tall glass.', 'Add the pearls on top.'] },
          { name: 'King Pearl Slushie', cat: 'drink', img: 'assets/rec-granizado.jpg',
            ing: ['300 ml fruit drink', 'Crushed ice', 'Syrup to taste', '70 g bursting pearls'],
            steps: ['Blend the ice with the drink.', 'Serve in a large glass.', 'Add the pearls and optional whipped cream.'] },
          { name: 'Bursting Mojito', cat: 'cocktail', img: 'assets/rec-mojito.jpg',
            ing: ['Mint', 'Lemon juice', 'Sparkling water', 'Rum', 'Ice', '50 g bursting pearls'],
            steps: ['Muddle mint and lemon.', 'Add ice and rum.', 'Top with sparkling water.', 'Add the pearls at the end.'] },
          { name: 'Yogurt with Pearls', cat: 'dessert', img: 'assets/rec-yogurt.jpg',
            ing: ['Greek yogurt', 'Chopped fruit', 'Granola', '40 g bursting pearls'],
            steps: ['Place yogurt in a glass.', 'Add fruit and granola.', 'Top with bursting pearls.'] },
          { name: 'Premium Waffle', cat: 'dessert', img: 'assets/rec-waffle.jpg',
            ing: ['Prepared waffle', 'Ice cream', 'Chocolate sauce', '50 g bursting pearls'],
            steps: ['Serve the waffle warm.', 'Add ice cream and sauce.', 'Top with bursting pearls.'] },
          { name: 'Decorated Cheesecake', cat: 'dessert', img: 'assets/rec-cheesecake.jpg',
            ing: ['Individual cheesecake', 'Fruit sauce', '30 g bursting pearls'],
            steps: ['Decorate the cheesecake with sauce.', 'Place the pearls on top before serving.'] },
          { name: 'Bursting Frappé', cat: 'drink', img: 'assets/rec-frappe.jpg',
            ing: ['250 ml milk', 'Coffee or chocolate', 'Ice', 'Whipped cream', '60 g bursting pearls'],
            steps: ['Blend milk, ice and flavoring.', 'Serve cold.', 'Top with cream and pearls.'] }
        ]
      },
      biz: {
        tag: 'Partnership', title: 'Benefits of working with King Pearl',
        items: [
          { t: 'Support & Advice', d: 'We provide constant guidance to our clients to help them grow, improve their products and offer a better experience to their consumers.' },
          { t: 'Promotions & Strategy', d: 'We run special promotions and campaigns that help boost sales and attract new customers.' },
          { t: 'Brand Activations', d: 'We support point-of-sale activations, tastings and events to give businesses greater visibility and increase brand impact.' },
          { t: 'POP Material', d: 'We provide advertising material such as banners, stickers, menus, displays and visual assets to improve your presentation and strengthen your brand image.' },
          { t: 'Constant Innovation', d: 'We bring in new flavors, ideas and trends so our clients always offer innovative, attractive products.' },
          { t: 'Quality & Trust', d: 'We work with excellent-quality products to guarantee flavor, freshness and satisfaction in every preparation.' }
        ]
      },
      about: {
        tag: 'About us', a: 'THE CROWN OF', b: 'PEARLS IN ECUADOR',
        pageTitle: 'Our story', pageSub: 'Meet the brand that crowns drinks and desserts across Ecuador.',
        body: 'King Pearl was born to bring the bubble-tea burst to every corner of the country. We select real fruit and seal it inside pearls ready to crown the creations of cafés, ice-cream shops and bars across Ecuador.',
        stats: [['7', 'crowned flavors'], ['100%', 'real fruit juice'], ['+3', 'main cities']]
      },
      contact: {
        tag: "Let's talk", title: 'Ready to crown your business?',
        body: 'We distribute King Pearl bursting pearls across Ecuador. Write to us and get an instant quote.',
        wa: 'Message us on WhatsApp', email: 'Email', city: 'Quito · Guayaquil · Cuenca',
        rights: 'All rights reserved.',
        explore: 'Explore', cols_contact: 'Contact', cities: 'Location',
        ftTag: 'A burst of flavor in every bubble.',
        location: 'Visit us in Quito',
        showroom: 'Quito showroom', openNow: 'Open now', closedNow: 'Closed now',
        addrLabel: 'Address', call: 'Call', mapChip: 'Av. El Inca E4–239',
        access: 'Enter through Autos Sierra · 2nd floor · Ample parking',
        shipLabel: 'Delivery', emailLabel: 'Email',
        hoursLabel: 'Hours',
        hoursLines: ['Mon–Fri · 9:00 – 18:00', 'Sat · 9:30 – 14:00'],
        directions: 'Get directions',
        thanks: 'Thank you for trusting KING PEARL. Your support and preference motivate us to keep innovating and offering the highest-quality products to grow every project and venture together.',
        form: {
          title: 'Write to us directly',
          sub: "Tell us what you need and we'll get back to you within 24 hours.",
          name: 'Name', namePh: 'Your name',
          reach: 'Email or WhatsApp', reachPh: 'So we can get back to you',
          biz: 'Business or city', bizOpt: '(optional)', bizPh: 'E.g. Luna Café · Quito',
          msg: 'Message', msgPh: 'Which flavors interest you? Quantities? Delivery city?',
          send: 'Send message',
          note: 'You can also message us directly on WhatsApp.',
          sending: 'Sending…',
          ok: 'Message sent! We will get back to you very soon.',
          err: "We couldn't send it. Try again or message us on WhatsApp.",
          subject: 'New message from the King Pearl site'
        }
      },
      ship: {
        badge: '24h delivery',
        text: 'We deliver across Quito and nationwide.'
      },
      why: {
        eyebrow: 'Why us',
        title: 'Why choose King Pearl?',
        items: [
          { t: 'Premium quality', d: 'Our pearls are crafted to the highest standards, guaranteeing perfect texture and an authentic burst of flavor in every bite.' },
          { t: 'Profitability for your business', d: 'The ideal add-on to raise the perceived value of your drinks, desserts and ice cream, attracting more customers.' },
          { t: 'Variety & innovation', d: 'A wide range of fruit flavors and vibrant colors that turn any menu into a visual, delicious experience.' }
        ],
        slogan: 'King Pearl: a burst of flavor in every bubble.'
      },
      reviews: {
        eyebrow: 'Happy customers',
        title: 'What our customers say',
        items: [
          { name: 'María Fernanda', biz: 'Café · Quito', text: 'Immediate delivery: I ordered in the morning and was serving drinks with the pearls that same afternoon.' },
          { name: 'Andrés', biz: 'Ice-cream shop · Guayaquil', text: 'It arrived in under 24 hours and in perfect condition. Passion fruit is my customers’ favorite.' },
          { name: 'Daniela', biz: 'Bubble tea · Cuenca', text: 'Super reliable: always the same quality and they walk you through the whole order.' }
        ]
      }
    }
  };

  const CONTACT = {
    whatsapp: '+593 98 523 8661',
    waLink: 'https://wa.me/593985238661',
    telLink: 'tel:+593985238661',
    email: 'bobasecu@gmail.com',
    instagram: '@kingpearl2026',
    igLink: 'https://instagram.com/kingpearl2026',
    fbLink: 'https://www.facebook.com/profile.php?id=61590114514296',
    ttLink: 'https://www.tiktok.com/@kingpearl32',
    address: 'Av. El Inca E4-239 y Guepi, norte de Quito',
    mapsLink: 'https://maps.app.goo.gl/edLhCx89fENtCMgeA'
  };

  window.KP = { FLAVORS, PRICE, I18N, CONTACT };
})();
