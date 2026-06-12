<?php
/**
 * King Pearl theme bootstrap.
 *
 * The front end is the original King Pearl single-page app: data.js holds the
 * brand data + bilingual ES/EN strings and app.js renders everything into
 * #root with hash routing (#/, #/usos, #/recetas, #/nosotros). The theme's
 * job is to serve those bundles from the theme directory and hand them the
 * correct asset base URL via window.KP_BASE.
 *
 * @package King_Pearl
 */

define( 'KING_PEARL_VERSION', '1.0.0' );

/**
 * Theme supports.
 */
function king_pearl_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'script', 'style', 'search-form' ) );
}
add_action( 'after_setup_theme', 'king_pearl_setup' );

/**
 * Styles and scripts. Mirrors the static index.html: Google Fonts, the brand
 * stylesheet, then data.js + app.js at the end of <body>.
 */
function king_pearl_assets() {
	$base = trailingslashit( get_template_directory_uri() );

	wp_enqueue_style(
		'king-pearl-fonts',
		'https://fonts.googleapis.com/css2?family=Bevan&family=Baloo+2:wght@600;700;800&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'king-pearl-style', get_stylesheet_uri(), array( 'king-pearl-fonts' ), KING_PEARL_VERSION );

	wp_enqueue_script( 'king-pearl-data', $base . 'data.js', array(), KING_PEARL_VERSION, true );
	wp_enqueue_script( 'king-pearl-app', $base . 'app.js', array( 'king-pearl-data' ), KING_PEARL_VERSION, true );

	// The app resolves every image as KP_BASE + 'assets/…'.
	wp_add_inline_script( 'king-pearl-data', 'window.KP_BASE = ' . wp_json_encode( $base ) . ';', 'before' );
}
add_action( 'wp_enqueue_scripts', 'king_pearl_assets' );

/**
 * Preconnect to the Google Fonts origins (ports the <link rel="preconnect">
 * tags from the static index.html).
 *
 * @param array  $urls          URLs to print for resource hints.
 * @param string $relation_type The relation type being printed.
 * @return array
 */
function king_pearl_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array( 'href' => 'https://fonts.googleapis.com' );
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'king_pearl_resource_hints', 10, 2 );

/**
 * Head extras ported from the static index.html: meta description, crown
 * favicon fallback, and preloads that warm the flavor-tub images so the
 * interactive showcase swaps instantly.
 */
function king_pearl_head() {
	$base = trailingslashit( get_template_directory_uri() );

	if ( is_front_page() ) {
		echo '<meta name="description" content="King Pearl — perlas explosivas de fruta real. Una explosión de sabor en cada bocado. Ecuador." />' . "\n";
	}

	if ( ! has_site_icon() ) {
		printf( '<link rel="icon" href="%s" />' . "\n", esc_url( $base . 'assets/crown-black.png' ) );
	}

	foreach ( array( 'flavor-maracuya.jpg', 'flavor-cereza.jpg', 'flavor-manzana.jpg', 'flavor-arandano.jpg' ) as $img ) {
		printf( '<link rel="preload" as="image" href="%s" />' . "\n", esc_url( $base . 'assets/' . $img ) );
	}
}
add_action( 'wp_head', 'king_pearl_head' );
