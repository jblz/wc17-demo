console.log( 'LETS REST!' );


( function( $ ){
	$( function() {
		console.log( WC2017 );
		if ( ! WC2017 ) {
			return;
		}
		$.ajax( {
			url: WC2017.endpoint + 'wp/v2/media',
			method: 'GET',
			beforeSend: function(xhr) {
				xhr.setRequestHeader( 'X-WP-Nonce', WC2017.nonce );
			},
			dataType: 'json',
			success: function(data) {
			  console.log(data);
			}
		} );
	} );
} )(jQuery);
