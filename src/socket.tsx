import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import io, { Socket } from "socket.io-client";
import { server } from "./constants/config";

// Define the expected events or types for your socket instance
interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: string) => void;
}

// Initialize the Socket context with the specific type
const SocketContext = createContext<Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null>(null);

// Custom hook to access the socket
const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// SocketProvider component
const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const socket = useMemo(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      server,
      {
        withCredentials: true,
      },
    );

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
    });

    return newSocket; // The socket instance will be the same until the provider unmounts
  }, []); // The empty array ensures the socket is created only once

  useEffect(() => {
    // Cleanup function to disconnect socket when the provider unmounts
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [socket]); // This ensures that the cleanup happens correctly

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
