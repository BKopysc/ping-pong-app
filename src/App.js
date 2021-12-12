import logo from './logo.svg';
import './App.css';
import GamePanel from './components/GamePanel';
import React from 'react';

class App extends React.Component {

  render() {
    return (
        <div className="App">
          <h1>Ping Pong</h1>
          <GamePanel />
        </div>
    );
  }
}

export default App;
