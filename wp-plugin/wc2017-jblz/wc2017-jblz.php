<?php

/**
 * Plugin Name: Easing into React - WordCamp 2017
 * Author: Jeff Bowen
 */

class WC2017_Jblz {
	const VERSION = '0.111111a';

	static function init() {
		if ( is_admin() ) {
			// @TODO register endpoints, etc.
			return;
		}

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
}

add_action( 'init', array( 'WC2017_Jblz', 'init' ) );
