import { Link } from "../../styles/styledComponent";

interface ChatItemProps {
  name: string;
  _id: string;
  sameSender: boolean;
  groupChat?: boolean;
  handleDeleteChat: (e: any | null, chatId: string, groupChat: boolean) => void;
}

const ChatItem = ({
  name,
  _id,
  sameSender,
  groupChat = false,
  handleDeleteChat,
}: ChatItemProps) => {
  return (
    <Link
      to={`/chat/${_id}`}
      style={{ padding: 0 }}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          padding: "1rem",
        }}
      >
        {/* / */}
        <div>AvatarCard</div>
        {/*  */}

        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <p style={{ fontSize: "16px" }}>{name}</p>
          {/* {newMessageAlert && (
            <p style={{ fontSize: "16px" }}>
              {newMessageAlert.count} New Message
            </p>
          )} */}
        </div>
        {/* / */}

        {/* {isOnline && (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )} */}
      </div>
    </Link>
  );
};

export default ChatItem;
