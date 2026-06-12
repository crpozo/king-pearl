<?php
/**
 * Universal template. The whole site is the King Pearl single-page app:
 * app.js renders into #root and routes with location.hash, so every
 * WordPress URL serves the same shell.
 *
 * @package King_Pearl
 */

get_header();
?>
<div id="root"></div>
<?php
get_footer();
