import { useState } from "react";
import { useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector, useErrors } from "../../hooks/hooks";
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

    useErrors([{ isError, error }]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading chats</div>;

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
