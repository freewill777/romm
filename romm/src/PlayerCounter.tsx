import * as React from "react";
import * as io from "socket.io-client";

interface PlayerCounterProps {
  connectedPlayers: number;
}

const PlayerCounter: React.FunctionComponent<PlayerCounterProps> = ({
  connectedPlayers,
}) => {
  const [players, setPlayers] = React.useState(connectedPlayers);
  const socket = io.connect("http://192.168.0.242:3000");

  React.useEffect(() => {
    socket.on("players", (newPlayers: number) => {
      setPlayers(newPlayers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Connected players: {players}</p>
    </div>
  );
};
