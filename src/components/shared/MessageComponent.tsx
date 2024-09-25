import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

interface Message {
  sender: {
    _id: string;
    name: string;
  };
  content: string;
  attachments?: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  createdAt: string;
}

const MessageComponent = ({
  message,
  user,
}: {
  message: Message;
  user: any;
}) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      className="message-component"
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <div className="message-component-sender">{sender.name}</div>
      )}

      {content && <div className="message-component-content">{content}</div>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <div className="message-component-attachment" key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </div>
          );
        })}

      <div className="message-component-timeAgo">{timeAgo}</div>
    </div>
  );
};

export default MessageComponent;
