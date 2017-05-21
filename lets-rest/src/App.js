/**
 * External dependencies
 */
import React, { Component } from 'react';
//import './App.css';

/**
 * Internal dependencies
 */
import Fetcher from './fetcher';
import MediaList from './media-list';
import StoryList from './story-list';

class LetsRest extends Component {
	static defaultProps = {
		storyMode: 0,
	}

	constructor( props ) {
		super( props );

		// Set the initial state
		this.state = {
			storyMode: !! props.storyMode,
		};
	}

	// Instance properties
	toggleFeature = () => {
		console.log( 'toggle!', this.state );
		const { storyMode } = this.state;
		this.setState( { storyMode: ! storyMode } );
	}

	render() {
		const { storyMode } = this.state;
		const mode = storyMode ? 'stories' : 'media';
		const list = mode === 'stories'
			? <StoryList />
			: <MediaList />;

		return (
			<div className={ 'lets-rest-' + mode }>
				<button onClick={ this.toggleFeature }>Click me!</button>
				<hr />
				<h1>{ storyMode ? 'Stories' : 'Media' }</h1>
				<Fetcher>{ list }</Fetcher>
			</div>
		);
	}
}

export default LetsRest;
