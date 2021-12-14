import logo from './logo.svg';
import './App.css';
import GamePanel from './components/GamePanel/GamePanel';
import Footer from './components/Footer'
import React from 'react';
import Description from './components/Description/Description';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>Ping Pong</h1>
        <GamePanel />
        <Description />
        <Footer />
      </div>
    );
  }
}

export default App;
