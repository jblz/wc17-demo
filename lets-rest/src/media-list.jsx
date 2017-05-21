// React has to be in scope to use JSX
import React from 'react';

function MediaList( props ) {
	const { media } = props;

	const list = media.length
		? <ul>{
			media.map( image => {
				return (
					<li key={ image.id }>
						<a href={ image.link }>
							<img src={ image.source_url } alt={ 'media item with slug: ' + image.slug } />
						</a>
					</li>
				);
			} )
		}</ul>
		: null;

	return (
		<div className="media">
			{ list || 'No Media 😭' }
		</div>
	);
}

export default MediaList;
