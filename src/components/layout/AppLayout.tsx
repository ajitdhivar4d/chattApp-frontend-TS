import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_REQUEST, REFETCH_CHATS } from "../../constants/events";
import {
  useAppDispatch,
  useAppSelector,
  useErrors,
  useSocketEvents,
} from "../../hooks/hooks";
import { useMyChatsQuery } from "../../redux/api/api";
import { selectAuthState } from "../../redux/reducers/auth";
import { incrementNotification } from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { useSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

// Higher-order component to wrap a component with layout
const AppLayout = () => (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithLayout = (props: any) => {
    const navigate = useNavigate();

    // Hook to retrieve URL parameters
    const params = useParams();

    // Redux hooks
    const dispatch = useAppDispatch();
    const socket = useSocket();

    console.log(socket);

    // State to manage the anchor element for the delete menu
    const [deleteMenuAnchorEl, setDeleteMenuAnchorEl] =
      useState<HTMLButtonElement | null>(null);

    // Extract chatId from URL parameters
    const chatId = params.chatId ?? "";

    // Select user data from the Redux store
    const { user } = useAppSelector(selectAuthState);

    // Fetch chats from the API
    const { data, isError, error, isLoading, refetch } = useMyChatsQuery("");

    // Handle errors globally
    useErrors([{ isError, error }]);

    // Function to handle chat deletion
    const handleDeleteChat = (
      e: any | null,
      chatId: string,
      groupChat: boolean,
    ) => {
      console.log(chatId);
      dispatch(setIsDeleteMenu(true)); // Show delete menu
      dispatch(setSelectedDeleteChat({ chatId, groupChat })); // Set selected chat for deletion

      // Set the anchor element for the delete menu
      if (e) {
        setDeleteMenuAnchorEl(e.currentTarget);
      }
    };

    // Listener for new requests
    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification()); // Increment notification count
      console.log("New request received");
    }, [dispatch]);

    // Listener for refetching chats
    const refetchListener = useCallback(() => {
      console.log("Refetching chats");
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    // Map event handlers
    const eventHandlers = {
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
    };

    // Setup socket event listeners
    useSocketEvents(socket, eventHandlers);

    // Conditional rendering for loading and error states
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return (
        <div>
          {`Error ${(error as FetchBaseQueryError)?.status || "Unknown"}: ${
            ((error as FetchBaseQueryError)?.data as { message?: string })
              ?.message ||
            (error as SerializedError)?.message ||
            "An unknown error occurred"
          }`}
        </div>
      );
    }

    // Main layout rendering
    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu deleteMenuAnchorEl={deleteMenuAnchorEl} />
        <div className="appLayout-grid-container">
          {/* Chat list section */}
          <div className="grid-item_1 grid-item">
            <ChatList
              chatId={chatId ?? ""}
              chats={data?.chats}
              handleDeleteChat={handleDeleteChat}
            />
          </div>

          {/* Wrapped component section */}
          <div className="grid-item_2 grid-item">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </div>

          {/* Profile section */}
          <div className="grid-item_3 grid-item">
            <Profile user={user} />
          </div>
        </div>
      </>
    );
  };

  return ComponentWithLayout;
};

export default AppLayout;
