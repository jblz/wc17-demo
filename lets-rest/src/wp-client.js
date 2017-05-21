import WPAPI from 'wpapi';

// @TODO inject URL & nonce dependencies
const wp = new WPAPI( {
	endpoint: 'http://local.wordpress.dev/wp-json',
} );

wp.stories = wp.registerRoute( 'wc2017_jblz/v1', '/stories' );

export default wp;
