import ChatItem from "../shared/ChatItem";

const w = "100%";
const data = [1, 2, 3];

const ChatList = () => {
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
      {data.map((_, i) => {
        return <ChatItem key={i} />;
      })}
    </div>
  );
};

export default ChatList;
