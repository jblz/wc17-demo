import React, { Component } from 'react';
//import './App.css';
import wp from './wp-client';

const FETCH_DATA_INTERVAL = 5000;

class App extends Component {
	// Static properties
	static defaultProps = {
		mode: 'stories',
	}

	// Instance properties
	state = {
		media: [],
		stories: [],
	}

	fetchMedia = () => {
		wp.media().then( data => this.setState( { media: data } ) );
	}

	fetchStories = () => {
		wp.stories().then( data => this.setState( { stories: data } ) );
	}

	fetchData = () => {
		switch ( this.props.mode ) {
			case 'media':
				this.fetchMedia();
				return;
			default:
			case 'stories':
				this.fetchStories();
				return;
		}
	}

	// Lifecycle methods
	componentWillMount() {
		this.fetchData();
		this.fetchDataInterval = setInterval( this.fetchData, FETCH_DATA_INTERVAL );
	}

	componentWillUnmount() {
		clearInterval( this.fetchDataInterval );
	}

	render() {
		const { media, stories } = this.state;
		const { mode } = this.props;

		console.log( 'Rendering!', { media, stories } );

		switch ( this.props.mode ) {
			case 'media':
				return this.renderMedia();
			default:
			case 'stories':
				return this.renderStories();
		}
	}

	renderMedia() {
		const { media } = this.state;

		const list = media.length
			? <ul>{
				media.map( image => {
					console.log( { image } );
					return (
						<a href={ image.link }><img src={ image.source_url } /></a>
					);
				} )
			}</ul>
			: null;

		return (
		  <div className="App">
			<div className="media">
				{ list || 'No Media 😭' }
			</div>
		  </div>
		);
	}

	renderStories() {
		const { stories } = this.state;

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
		  <div className="App">
			<div className="stories">
				{ list || 'No Stories 😭' }
			</div>
		  </div>
		);
	}
}

export default App;
