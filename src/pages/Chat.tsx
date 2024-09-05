import { useEffect, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../styles/styledComponent";
import { BsSendFill } from "react-icons/bs";
import FileMenu from "../components/dialogs/FileMenu";
import { setIsFileMenu } from "../redux/reducers/misc";
import { useAppDispatch } from "../hooks/hooks";

interface User {
  id: string;
  name: string;
}

interface ChatProps {
  chatId: string;
  user: User;
}

const Chat: React.FC<ChatProps> = ({ chatId, user }) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]); // Update the type here based on the message structure
  const [userTyping, setUserTyping] = useState<boolean>(true);
  const [fileMenuAnchor, setFileMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const allMessages = [1, 2, 3];

  const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // Type corrected here
    e.preventDefault();
    console.log("submitHandler ", message);
  };

  const handleFileOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Type corrected here
    e.preventDefault();
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  return (
    <>
      <div className="all-messages-section">
        {allMessages.map((i) => (
          <MessageComponent key={i} />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </div>

      <form className="chat-form" onSubmit={submitHandler}>
        <div className="msg-attacheFile-section">
          <button
            type="button"
            className="button attacheFileBtn"
            aria-label="Add File"
            onClick={handleFileOpen}
          >
            <MdAttachFile size={24} />
          </button>

          <InputBox
            className="msg-input"
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <button className="button msgSendBtn" aria-label="Send" type="submit">
            <BsSendFill size={24} />
          </button>
        </div>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
