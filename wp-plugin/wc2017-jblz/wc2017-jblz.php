<?php

/**
 * Plugin Name: Easing into React - WordCamp 2017
 * Author: Jeff Bowen
 */

class WC2017_Jblz {
	const VERSION = '0.1a';

	static function init() {
		if ( is_admin() ) {
			// @TODO register "write" endpoints, etc.
			return;
		}

		add_action( 'rest_api_init', array( 'WC2017_Jblz', 'rest_api_init' ) );
		add_action( 'wp', array( 'WC2017_Jblz', 'late_init' ) );
	}

	static function late_init() {
		if ( is_attachment() ) {
			return;
		}

		if ( is_active_sidebar( 'sidebar-1' ) ) {
			wp_enqueue_script( 'wcjblz_countdown_timer', plugins_url( 'js/countdown-timer.js', __FILE__ ), array(), self::VERSION, true );
		}

		if ( ! is_page() ) {
			// For simplicty sake
			return;
		}

		$page = get_queried_object();

		switch ( $page->post_name ) {
			case 'lets-rest-for-a-minute':
				wp_enqueue_script( 'wcjblz_lets_rest', plugins_url( 'js/lets-rest.js', __FILE__ ), array(), self::VERSION, true );
				$js_settings = array(
					'endpoint' => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				);
				wp_localize_script( 'wcjblz_lets_rest', 'WC2017', $js_settings );
				break;
			case 'hello-world':
				wp_enqueue_script( 'wcjblz_hello_world', plugins_url( 'js/hello-world.js', __FILE__ ), array(), self::VERSION, true );
				break;
		}
	}

	static function rest_api_init() {
		register_rest_route( 'wc2017_jblz/v1', '/stories', array(
			'methods' => 'GET',
			'callback' => array( 'WC2017_Jblz', 'rest_callback_stories' )
		) );
	}

	static function rest_callback_stories( $request ) {
		$rest_query = new WP_Query( array(
			'post_status' => 'publish',
			'tag' => 'story',
			'date_query' => array(
				array(
					'column' => 'post_date_gmt',
					'after' => '1 day ago',
				),
			// @TODO A CPT & `type` param would be much more useful here. Mobile app support...?
			//'nopaging' => true,
			),
		) );
		return array_map( function( $post ) {
			// Possibly necessary depending on what you call in this context:
			setup_postdata( $post );

			$post_title = get_the_title( $post );
			$post_id = $post->ID;
			// @TODO handle HTML entities
			$post_excerpt = wp_strip_all_tags( apply_filters( 'get_the_excerpt', $post->post_content ) );
			$thumbnail_url = self::get_story_img_url( $post );

			$comments = array_map( function( $comment ) {
				return array(
					'comment_ID' => $comment->comment_ID,
					'comment_content' => wp_trim_excerpt( $comment->comment_content ),
				);
			}, get_comments( array( 'post_id' => $post->ID ) ) );

			// If you setup_postdata, it's good practice to set it back
			wp_reset_postdata();

			return compact( 'post_id', 'post_title', 'thumbnail_url', 'post_excerpt', 'comments' );
		}, $rest_query->posts );
	}

	static function get_story_img_url( $post ) {
		$thumbnail_id = get_post_thumbnail_id( $post->ID );
		if ( $thumbnail_id ) {
			return wp_get_attachment_image_url( $thumbnail_url );
		}

		$images = get_attached_media( 'image', $post->ID );
		if ( empty( $images ) ) {
			return '';
		}
		$first_image = array_values( $images )[0];
		return wp_get_attachment_image_url( $first_image->ID );
	}
}

add_action( 'init', array( 'WC2017_Jblz', 'init' ) );
