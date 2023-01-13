import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { socket } from "./socket";
function App() {
  const [connectedPlayers, setConnectedPlayers] = useState(0);

  useEffect(() => {
    socket.on("players", (numPlayers: number) => {
      setConnectedPlayers(numPlayers);
    });
    return () => {
      socket.off("players");
    };
  }, []);

  return (
    <div className="App">
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
