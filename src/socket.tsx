import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import io, { Socket } from "socket.io-client";
import { server } from "./constants/config";

// Define types for socket events that the server sends to the client
interface ServerToClientEvents {
  message: (data: string) => void; // Message event sent by the server
  reconnect_attempt: (attempt: number) => void; // Event for reconnection attempts
  reconnect_error: (error: Error) => void; // Event for reconnection errors
  error: (error: Error) => void; // General error event
}

// Define types for socket events that the client sends to the server
interface ClientToServerEvents {
  sendMessage: (data: string) => void; // Send message to server
}

// Create a context to hold the socket connection, initialized as `null`
const SocketContext = createContext<Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null>(null);

// Custom hook to access the socket instance
const useSocket = () => useContext(SocketContext);

// SocketProvider component to manage the socket connection and provide it to child components
const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to store the current socket instance
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  // useRef to hold the socket instance, ensuring it persists across re-renders
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    // If no socket is initialized, create a new connection
    if (!socketRef.current) {
      socketRef.current = io(server, { withCredentials: true }); // Connect to the server

      // Event: Socket successfully connected
      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current?.id);
        setSocket(socketRef.current); // Set the connected socket instance in state
      });

      // Event: Socket disconnected
      socketRef.current.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
        setSocket(null); // Clear the socket instance when disconnected
      });

      // Event: Reconnection attempts
      socketRef.current.on("reconnect_attempt", (attempt: number) => {
        console.log(`Reconnect attempt #${attempt}`);
      });

      // Event: Error during reconnection
      socketRef.current.on("reconnect_error", (error: Error) => {
        console.error("Reconnect error:", error);
      });

      // Event: General socket error
      socketRef.current.on("error", (error: Error) => {
        console.error("Socket error:", error);
      });
    }

    // Cleanup: Disconnect socket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        console.log("Socket disconnected");
      }
    };
  }, []); // Empty dependency array ensures this effect only runs on mount/unmount

  // Memoize the context value to avoid unnecessary re-renders when the socket hasn't changed
  const contextValue = useMemo(() => socket, [socket]);

  return (
    // Provide the memoized socket instance to child components
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
