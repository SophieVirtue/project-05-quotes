<?php
/**
 * The template for displaying all single posts.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="single-page site-main" role="main">

	<?php if ( have_posts() ) : 
		
		while(have_posts() ): the_post();

		get_template_part('template-parts/content');

		endwhile;

	else: 
		
		get_template_part('template-parts/content', 'none');

	endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
