import React, { Component } from 'react';
import './App.css';
import CountdownTimer from './countdown-timer';

const TIMER_EXPIRATION = '2017-05-21 15:45 UTC';

class App extends Component {
  render() {
    return (
      <div className="App">
		<CountdownTimer expiration={ TIMER_EXPIRATION }>
			Some child text which must explicitly be handled in the component
		</CountdownTimer>
      </div>
    );
  }
}

export default App;
