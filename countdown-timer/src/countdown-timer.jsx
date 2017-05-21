import React, { Component } from 'react';
// @TODO import PropTypes from 'react-proptypes' b/c React.PropTypes is deprecated;

import image from './godh.gif'

function getTimestamp( dateArg ) {
	const date = typeof dateArg !== 'undefined' ? new Date( dateArg ) : new Date();
	return date.getTime();
}

class CountdownTimer extends Component {
	static propTypes = {
		// oneOf string or number
		expiration: React.PropTypes.string.isRequired,
	};

	state = {
		timestamp: getTimestamp(),
	};

	expirationTimestamp = getTimestamp( this.props.expiration );

	// NOTE: Instance property!!
	tick = () => {
		this.setState( {
			timestamp: getTimestamp(),
		} );
	};

	// Begin static methods (React lifecycle methods are automatically "bound" to "this")
	componentWillMount() {
		this.timerInterval = setInterval( this.tick, 1000 );
	}

	componentWillUnmount() {
		clearInterval( this.timerInterval );
	}

	render() {
		const remainingSeconds = ( this.expirationTimestamp - this.state.timestamp ) / 1000;
		if ( remainingSeconds < 0 ) {
			return <img src={ image } alt="Game over, man. Game over!" />;
		}
		return (
			<div>
				<h2>Countdown Timer!</h2>
				<p>
					Current timestamp: { this.state.timestamp }
				</p>
				<p>
					This talk is over at: { this.props.expiration }<br />
					( Timestamp: { this.expirationTimestamp } )
				</p>
				<div>
					That means I only have { Math.max( 0, Math.floor( remainingSeconds ) ) } seconds left!!!!!1111<br />
					Seems like a long time when I put it that way.<br />
					{ Math.max( 0, ( remainingSeconds / 60 ).toFixed( 2 ) ) } minutes will go quickly!
					<hr />
					Come to think of it, that's only:
					<ul>
						<li>{ Math.max( 0, ( remainingSeconds / 3600 ).toFixed( 2 ) ) } hours</li>
						<li>{ Math.max( 0, ( remainingSeconds / 86400 ).toFixed( 2 ) ) } days</li>
					</ul>
				</div>
				🙀
			</div>
		);
	}
}

export default CountdownTimer;
