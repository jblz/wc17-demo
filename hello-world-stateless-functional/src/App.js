import React from 'react';

function WhatStatelessComponentsDo( props ) {
	return (
		<div>
			<h2>They</h2>
			<ul>
				<li>Take props</li>
				<li>Return a React element</li>
			</ul>
		</div>
	);
}

function App( props ) {
	return (
		<div>
			<h1>Hello World!</h1>
			This is a "stateless functional" component
			<WhatStatelessComponentsDo />
			<h2>Passed Props</h2>
			WordCamp: { props.wordcamp }<br />
			Feeling: { props.feeling }
		</div>
	);
}

export default App;
