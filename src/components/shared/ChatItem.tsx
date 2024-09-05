import { Link } from "../../styles/styledComponent";

// const avatar = [];
const name = "Mohit";
const _id = 23;
// const groupChat = false;
const sameSender = true;
const isOnline = true;
const newMessageAlert = {
  count: 11,
};
// const index = 0;

// const handleDeleteChat ;

const ChatItem = () => {
  return (
    <Link to={`/chat/${_id}`} style={{ padding: 0 }}>
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
          {newMessageAlert && (
            <p style={{ fontSize: "16px" }}>
              {newMessageAlert.count} New Message
            </p>
          )}
        </div>
        {/* / */}

        {isOnline && (
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
        )}
      </div>
    </Link>
  );
};

export default ChatItem;
