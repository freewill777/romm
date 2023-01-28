import { useEffect } from "react";
import { socket } from "./socket";

interface PlayerClientProps {
  setConnectedPlayers: Function;
}

function PlayerClient({ setConnectedPlayers }: PlayerClientProps): JSX.Element {
  useEffect(() => {
    socket.on("players", (numPlayers: number) => {
      setConnectedPlayers(numPlayers);
    });
    return () => {
      socket.off("players");
    };
  }, [setConnectedPlayers]);
  return <></>;
}

export default PlayerClient;
