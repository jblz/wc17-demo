import React from 'react';

function App( props ) {
	return (
		<div>
			<h1>Hello World!</h1>
			This is a "stateless functional" component
			<h2>They</h2>
			<ul>
				<li>Take props</li>
				<li>Return a React element</li>
			</ul>
			<h2>Passed Props</h2>
			WordCamp: { props.wordcamp }<br />
			Feeling: { props.feeling }
		</div>
	);
}

export default App;
