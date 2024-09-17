import { Chat } from "../../redux/api/api";
import ChatItem from "../shared/ChatItem";

interface ChatListProps {
  w?: string;
  chats?: Chat[];
  chatId: string;
  handleDeleteChat: any | null;
}

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  handleDeleteChat,
}: ChatListProps) => {
  return (
    <div
      className="ChatList-container"
      style={{
        width: w,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      {chats?.map((data, index) => {
        const { _id, name, groupChat } = data;
        console.log(data);

        return (
          <ChatItem
            name={name}
            _id={_id}
            key={index}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
