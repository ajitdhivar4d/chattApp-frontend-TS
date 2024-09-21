import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useMyChatsQuery } from "../../redux/api/api";
import { selectAuthState } from "../../redux/reducers/auth";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent: React.ComponentType<any>) => {
  return (props: JSX.IntrinsicAttributes) => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const [deleteMenuAnchorEl, setDeleteMenuAnchorEl] =
      useState<HTMLButtonElement | null>(null);

    const chatId = params.chatId ?? "";

    const { user } = useAppSelector(selectAuthState);
    const { data, isError, error, isLoading } = useMyChatsQuery("");

    useEffect(() => {
      if (isError) {
        console.error('Error loading chats:', error);
        toast.error(((error as FetchBaseQueryError)?.data as { message?: string })?.message || "Something went wrong");
      }
    }, [isError, error]);

    // useErrors([{ isError, error }]);

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
      // Assuming error is of type FetchBaseQueryError or SerializedError from RTK Query
      let errorMessage = 'Error loading chats';
      
      if ('status' in error) {
        // For RTK Query's FetchBaseQueryError
        errorMessage = `Error ${error.status}: ${(error.data as { message?: string })?.message || 'Unknown error'}`;
      } else if (error instanceof Error) {
        // For SerializedError or generic Error
        errorMessage = error.message;
      }
    
      return <div>{errorMessage}</div>;
    }
    
    const handleDeleteChat = (
      e: any | null, // Use a more flexible type to avoid crashes
      chatId: string,
      groupChat: boolean,
    ) => {
      console.log(chatId);
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));

      setDeleteMenuAnchorEl(e.currentTarget);
    };

    // console.log(data);

    //  const { user } = useSelector((state) => state.auth);
    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu deleteMenuAnchorEl={deleteMenuAnchorEl} />
        <div className="appLayout-grid-container">
          {/* one */}
          <div className="grid-item_1 grid-item">
            <ChatList
              chatId={chatId ?? ""}
              chats={data?.chats}
              handleDeleteChat={handleDeleteChat}
            />
          </div>

          {/* two */}
          <div className="grid-item_2 grid-item">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </div>

          {/* three */}
          <div className="grid-item_3 grid-item">
            <Profile user={user} />
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
