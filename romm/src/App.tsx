import { useState, useEffect } from "react";
import "./App.css";
import PlayerClient from "./PlayerClient";
function App() {
  const [connectedPlayers, setConnectedPlayers] = useState(0);
  console.log("XXX");
  return (
    <div className="App">
      <PlayerClient setConnectedPlayers={setConnectedPlayers} />
      Players connected: {connectedPlayers}
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src="/logo.png" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Realms of Might and Magic</h1>
      <div className="card">
        <button onClick={() => setConnectedPlayers((count) => count + 1)}>
          start game
        </button>
      </div>
    </div>
  );
}

export default App;
