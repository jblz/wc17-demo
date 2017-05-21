/**
 * External dependencies
 */
import React from 'react';

function StoryList( props ) {
	const { stories } = props;

	const list = stories.length ? <ul>{
		stories.map( story => {
			console.log( { story } );
			const {
				post_excerpt,
				post_id,
				post_title,
				thumbnail_url,
			} = story;

			const thumbnail = thumbnail_url
				? <div className="thumbnail">
					<img src={ thumbnail_url } alt={ 'thumbnail image for post #' + post_id } />
				</div>
				: null;

			return <li key={ post_id }>
				<h3>{ post_title }</h3>
				{ thumbnail }
				<p className="excerpt">{ post_excerpt }</p>
			</li>;
		} )
	}</ul> : null;

	return (
		<div className="stories">
			{ list || 'No Stories 😭' }
		</div>
	);
}

export default StoryList;
