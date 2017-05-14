import React, { Component } from 'react';
import logo from './logo.svg';
import wpLogo from './wordpress-logo.svg';
import './App.css';

// To move to a different file
import CountdownTimer from './countdown-timer';
// end to move

const stuff = {
	logo,
	wpLogo,
	welcomeMessage: 'Welcome to React',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
{/* This is commented out so stuff isn't spinning during dev -- @TODO uncomment!
          <img src={ stuff.logo } className="App-logo" alt="logo" />
*/}
		  <h2>{ stuff.welcomeMessage }</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<CountdownTimer expiration="2017-05-20">
			Some child text which must explicitly be handled in the component
		</CountdownTimer>
      </div>
    );
  }
}

export default App;
