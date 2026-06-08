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
          'En KING PEARL transformamos cada bebida y postre en una experiencia única. Nuestras perlas explosivas están elaboradas con calidad, sabor y mucha innovación, ideales para cafeterías, confiterías, heladerías, restaurantes, locales de bebidas, postres, donas, emprendimientos y distribuidores que buscan ofrecer productos diferentes y llamativos.',
          'Trabajamos para impulsar negocios que quieran destacar con nuevas tendencias, mejor presentación y sabores que sorprendan a sus clientes.',
          'Gracias por ser parte de esta experiencia llena de color, creatividad y explosión de sabor.',
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
          'Aportan una experiencia innovadora y diferente.',
          'Mejoran la presentación de bebidas y postres.',
          'Atraen más clientes por su apariencia y sabor.',
          'Disponibles en varios sabores y colores.',
          'Fáciles de preparar y utilizar.',
          'Ideales para emprendimientos, cafeterías y negocios de bebidas.',
          'Incrementan el valor y atractivo de los productos.'
        ]
      },
      usage: {
        tag: 'Cómo usarlas', title: 'Cómo usarlas correctamente',
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
          { name: 'Bubble Tea Clásico Frutal', cat: 'drink',
            ing: ['250 ml de té frío', '30 ml de jarabe de frutas', 'Hielo', '60 g de perlas explosivas'],
            steps: ['Coloca hielo en el vaso.', 'Agrega el té y el jarabe.', 'Mezcla bien.', 'Añade las perlas al final.', 'Sirve con sorbete ancho.'] },
          { name: 'Limonada Explosiva', cat: 'drink',
            ing: ['Jugo de 2 limones', '300 ml de agua fría', 'Azúcar al gusto', 'Hielo', '50 g de perlas de fresa o maracuyá'],
            steps: ['Mezcla limón, agua y azúcar.', 'Agrega hielo.', 'Incorpora las perlas al final.', 'Decora con una rodaja de limón.'] },
          { name: 'Smoothie Tropical Premium', cat: 'drink',
            ing: ['1 taza de mango congelado', '½ taza de piña', '200 ml de yogurt o leche', 'Hielo', '60 g de perlas explosivas'],
            steps: ['Licúa las frutas con yogurt y hielo.', 'Sirve en vaso alto.', 'Añade las perlas encima.'] },
          { name: 'Granizado King Pearl', cat: 'drink',
            ing: ['300 ml de bebida frutal', 'Hielo triturado', 'Jarabe al gusto', '70 g de perlas explosivas'],
            steps: ['Licúa el hielo con la bebida.', 'Sirve en vaso grande.', 'Agrega las perlas y crema batida opcional.'] },
          { name: 'Mojito Explosivo', cat: 'cocktail',
            ing: ['Hierbabuena', 'Jugo de limón', 'Agua mineral', 'Ron', 'Hielo', '50 g de perlas explosivas'],
            steps: ['Machaca hierbabuena y limón.', 'Agrega hielo y ron.', 'Completa con agua mineral.', 'Añade las perlas al final.'] },
          { name: 'Yogurt con Perlas', cat: 'dessert',
            ing: ['Yogurt griego', 'Frutas picadas', 'Granola', '40 g de perlas explosivas'],
            steps: ['Coloca yogurt en un vaso.', 'Agrega frutas y granola.', 'Decora con perlas explosivas.'] },
          { name: 'Waffle Premium', cat: 'dessert',
            ing: ['Waffle preparado', 'Helado', 'Salsa de chocolate', '50 g de perlas explosivas'],
            steps: ['Sirve el waffle caliente.', 'Añade helado y salsa.', 'Decora con perlas explosivas.'] },
          { name: 'Cheesecake Decorativo', cat: 'dessert',
            ing: ['Cheesecake individual', 'Salsa de frutas', '30 g de perlas explosivas'],
            steps: ['Decora el cheesecake con salsa.', 'Coloca las perlas encima antes de servir.'] },
          { name: 'Frappé Explosivo', cat: 'drink',
            ing: ['250 ml de leche', 'Café o chocolate', 'Hielo', 'Crema batida', '60 g de perlas explosivas'],
            steps: ['Licúa leche, hielo y saborizante.', 'Sirve frío.', 'Decora con crema y perlas.'] }
        ]
      },
      biz: {
        tag: 'Alianzas', title: 'Beneficios de trabajar con King Pearl',
        items: [
          { t: 'Soporte y asesoría', d: 'Acompañamiento constante para ayudarte a crecer, mejorar tus productos y ofrecer una mejor experiencia.' },
          { t: 'Promociones y estrategias', d: 'Promociones especiales y campañas que impulsan las ventas y atraen nuevos clientes.' },
          { t: 'Activaciones de marca', d: 'Apoyo con activaciones en punto de venta, degustaciones y eventos para dar visibilidad a tu negocio.' },
          { t: 'Material POP', d: 'Banners, stickers, menús, exhibidores y material visual para fortalecer tu imagen de marca.' },
          { t: 'Innovación constante', d: 'Nuevos sabores, ideas y tendencias para que siempre ofrezcas productos atractivos.' },
          { t: 'Calidad y confianza', d: 'Productos de excelente calidad que garantizan sabor, frescura y satisfacción en cada preparación.' }
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
        directions: 'Cómo llegar',
        thanks: 'Gracias por confiar en KING PEARL. Su apoyo y preferencia nos motivan a seguir innovando y ofreciendo productos de la mejor calidad para hacer crecer juntos cada proyecto y emprendimiento.'
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
          'At KING PEARL we turn every drink and dessert into a unique experience. Our bursting pearls are crafted with quality, flavor and plenty of innovation — ideal for cafés, candy shops, ice-cream parlors, restaurants, drink and dessert spots, donut shops, startups and distributors looking to offer eye-catching, different products.',
          'We work to boost businesses that want to stand out with new trends, better presentation and flavors that surprise their customers.',
          'Thank you for being part of this experience full of color, creativity and an explosion of flavor.',
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
          'They bring an innovative, different experience.',
          'They improve the presentation of drinks and desserts.',
          'They attract more customers with their look and flavor.',
          'Available in several flavors and colors.',
          'Easy to prepare and use.',
          'Ideal for startups, cafés and drink businesses.',
          'They increase the value and appeal of your products.'
        ]
      },
      usage: {
        tag: 'How to use', title: 'How to use them correctly',
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
          { name: 'Classic Fruit Bubble Tea', cat: 'drink',
            ing: ['250 ml cold tea', '30 ml fruit syrup', 'Ice', '60 g bursting pearls'],
            steps: ['Add ice to the glass.', 'Pour in the tea and syrup.', 'Mix well.', 'Add the pearls at the end.', 'Serve with a wide straw.'] },
          { name: 'Bursting Lemonade', cat: 'drink',
            ing: ['Juice of 2 lemons', '300 ml cold water', 'Sugar to taste', 'Ice', '50 g strawberry or passion-fruit pearls'],
            steps: ['Mix lemon, water and sugar.', 'Add ice.', 'Stir in the pearls at the end.', 'Garnish with a lemon slice.'] },
          { name: 'Tropical Premium Smoothie', cat: 'drink',
            ing: ['1 cup frozen mango', '½ cup pineapple', '200 ml yogurt or milk', 'Ice', '60 g bursting pearls'],
            steps: ['Blend the fruit with yogurt and ice.', 'Serve in a tall glass.', 'Add the pearls on top.'] },
          { name: 'King Pearl Slushie', cat: 'drink',
            ing: ['300 ml fruit drink', 'Crushed ice', 'Syrup to taste', '70 g bursting pearls'],
            steps: ['Blend the ice with the drink.', 'Serve in a large glass.', 'Add the pearls and optional whipped cream.'] },
          { name: 'Bursting Mojito', cat: 'cocktail',
            ing: ['Mint', 'Lemon juice', 'Sparkling water', 'Rum', 'Ice', '50 g bursting pearls'],
            steps: ['Muddle mint and lemon.', 'Add ice and rum.', 'Top with sparkling water.', 'Add the pearls at the end.'] },
          { name: 'Yogurt with Pearls', cat: 'dessert',
            ing: ['Greek yogurt', 'Chopped fruit', 'Granola', '40 g bursting pearls'],
            steps: ['Place yogurt in a glass.', 'Add fruit and granola.', 'Top with bursting pearls.'] },
          { name: 'Premium Waffle', cat: 'dessert',
            ing: ['Prepared waffle', 'Ice cream', 'Chocolate sauce', '50 g bursting pearls'],
            steps: ['Serve the waffle warm.', 'Add ice cream and sauce.', 'Top with bursting pearls.'] },
          { name: 'Decorated Cheesecake', cat: 'dessert',
            ing: ['Individual cheesecake', 'Fruit sauce', '30 g bursting pearls'],
            steps: ['Decorate the cheesecake with sauce.', 'Place the pearls on top before serving.'] },
          { name: 'Bursting Frappé', cat: 'drink',
            ing: ['250 ml milk', 'Coffee or chocolate', 'Ice', 'Whipped cream', '60 g bursting pearls'],
            steps: ['Blend milk, ice and flavoring.', 'Serve cold.', 'Top with cream and pearls.'] }
        ]
      },
      biz: {
        tag: 'Partnership', title: 'Benefits of working with King Pearl',
        items: [
          { t: 'Support & advice', d: 'Constant guidance to help you grow, improve your products and offer a better experience.' },
          { t: 'Promotions & strategy', d: 'Special promotions and campaigns that boost sales and attract new customers.' },
          { t: 'Brand activations', d: 'Support with point-of-sale activations, tastings and events to give your business visibility.' },
          { t: 'POP material', d: 'Banners, stickers, menus, displays and visual material to strengthen your brand image.' },
          { t: 'Constant innovation', d: 'New flavors, ideas and trends so you always offer attractive products.' },
          { t: 'Quality & trust', d: 'Excellent-quality products that guarantee flavor, freshness and satisfaction every time.' }
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
        directions: 'Get directions',
        thanks: 'Thank you for trusting KING PEARL. Your support and preference motivate us to keep innovating and offering the highest-quality products to grow every project and venture together.'
      }
    }
  };

  const CONTACT = {
    whatsapp: '+593 98 523 8661',
    waLink: 'https://wa.me/593985238661',
    email: 'hola@kingpearl.ec',
    instagram: '@kingpearl2026',
    igLink: 'https://instagram.com/kingpearl2026',
    fbLink: 'https://www.facebook.com/profile.php?id=61590114514296',
    ttLink: 'https://www.tiktok.com/@kingpearl32',
    address: 'Av. El Inca E4-239 y Guepi, norte de Quito',
    mapsLink: 'https://maps.app.goo.gl/edLhCx89fENtCMgeA'
  };

  window.KP = { FLAVORS, PRICE, I18N, CONTACT };
})();
