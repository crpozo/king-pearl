#!/usr/bin/env bash
# Rebuild the WordPress theme (wordpress/king-pearl) from the static-site
# sources at the repo root, then refresh the installable zip
# (wordpress/king-pearl.zip). Run after editing app.js / data.js /
# styles.css / assets.
set -euo pipefail
cd "$(dirname "$0")/.."
theme=wordpress/king-pearl

# Images: straight copy.
rm -rf "$theme/assets"
cp -r assets "$theme/assets"

# data.js / app.js: rewrite the relative 'assets/…' references so images are
# served from the theme directory. functions.php injects window.KP_BASE
# (theme URL, trailing slash) before data.js loads.
for f in data.js app.js; do
  sed -e 's/src="assets\//src="${KP_ASSETS}/g' \
      -e "s/'assets\//KP_ASSETS + '/g" "$f" \
    | awk -v q="'" '
        { print }
        !done && /^\(function \(\) \{$/ {
          print "  // WordPress build: window.KP_BASE (theme directory URL, trailing slash)"
          print "  // is injected by functions.php before this file loads."
          print "  const KP_ASSETS = (window.KP_BASE || " q q ") + " q "assets/" q ";"
          done = 1
        }' > "$theme/$f"
done

# style.css: WordPress theme header + the original stylesheet + WP tweaks.
cat > "$theme/style.css" <<'EOF'
/*
Theme Name: King Pearl
Theme URI: https://github.com/crpozo/king-pearl
Author: King Pearl
Author URI: https://instagram.com/kingpearl2026
Description: Tema a medida para King Pearl — perlas explosivas de fruta real (Ecuador). Landing inmersiva bilingüe ES/EN con hero púrpura real, catálogo interactivo de 7 sabores, recetas, usos, reseñas y contacto por WhatsApp. Custom theme for the King Pearl bursting-pearls brand site.
Version: 1.0.0
Requires at least: 5.9
Tested up to: 6.8
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: king-pearl
Tags: one-page, custom-colors, translation-ready
*/

/* ============================================================
   Original King Pearl static-site stylesheet (verbatim below).
   ============================================================ */

EOF
cat styles.css >> "$theme/style.css"
cat >> "$theme/style.css" <<'EOF'

/* ============================================================
   WordPress-specific additions
   ============================================================ */

/* Keep the fixed navbar below the WP admin bar for logged-in users. */
body.admin-bar .nv { top: 32px; }
@media screen and (max-width: 782px) {
  body.admin-bar .nv { top: 46px; }
}
EOF

# Installable zip (folder must sit at the zip root).
(cd wordpress && rm -f king-pearl.zip && zip -qr king-pearl.zip king-pearl)

echo "Theme rebuilt: $theme + wordpress/king-pearl.zip"
