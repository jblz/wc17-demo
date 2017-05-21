import React, { Component } from 'react';
import wp from './wp-client';

class Fetcher extends Component {
	static defaultProps = {
		intervalMs: 5000,
	}

	state = {
		media: [],
		stories: [],
	};

	fetchData = () => {
		wp.media().then( data => this.setState( { media: data } ) );
		wp.stories().then( data => this.setState( { stories: data } ) );
	}

	componentWillMount() {
		this.fetchData();
		console.log('props? ', this.props);
		this.fetchDataInterval = setInterval( this.fetchData, this.props.intervalMs );
	}

	componentWillUnmount() {
		clearInterval( this.fetchDataInterval );
	}

	componentWillUpdate() {
		if ( typeof this.props.onUpdate !== 'function' ) {
			return;
		}
		this.props.onUpdate();
	}

	render() {
console.log({state: this.state});
		const {
			media,
			stories,
		} = this.state;

		// Clone the child element along and pass along state
		return React.cloneElement( this.props.children, {
			media,
			stories,
		} );
	}
}

export default Fetcher;
