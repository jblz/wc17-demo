import React, { Component } from 'react';
import './App.css';
import CountdownTimer from './countdown-timer';

// Safari doesn't support dates like '2017-06-04' 😤
const TIMER_EXPIRATION = '2017/06/04 18:45 UTC';

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
