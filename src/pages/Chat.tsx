import { useInfiniteScrollTop } from "6pp";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useEffect, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loaders";
import MessageComponent from "../components/shared/MessageComponent";
import Skeleton from "../components/shared/Skeleton";
import { useAppDispatch, useErrors } from "../hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { setIsFileMenu } from "../redux/reducers/misc";
import { InputBox } from "../styles/styledComponent";
import { removeNewMessagesAlert } from "../redux/reducers/chat";

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
  const navigate = useNavigate();

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const [IamTyping, setIamTyping] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<boolean>(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  console.log(setMessages);
  console.log(setUserTyping);

  const chatDetails = useChatDetailsQuery(chatId ? { chatId } : skipToken);
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages,
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  useErrors(errors);

  // const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      setIamTyping(false);
    }, 2000);
  };

  const handleFileOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    setMessage("");
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  // const newMessagesListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;

  //     setMessages((prev) => [...prev, data.message]);
  //   },
  //   [chatId],
  // );

  // const stopTypingListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;
  //     setUserTyping(false);
  //   },
  //   [chatId],
  // );

  // const startTypingListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;

  //     setUserTyping(true);
  //   },
  //   [chatId],
  // );

  // const alertListener = useCallback(
  //   (data) => {
  //     if (data.chatId !== chatId) return;
  //     const messageForAlert = {
  //       content: data.message,
  //       sender: {
  //         _id: "djasdhajksdhasdsadasdas",
  //         name: "Admin",
  //       },
  //       chat: chatId,
  //       createdAt: new Date().toISOString(),
  //     };

  //     setMessages((prev) => [...prev, messageForAlert]);
  //   },
  //   [chatId],
  // );

  // const eventHandler = {
  //   [ALERT]: alertListener,
  //   [NEW_MESSAGE]: newMessagesListener,
  //   [START_TYPING]: startTypingListener,
  //   [STOP_TYPING]: stopTypingListener,
  // };

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const allMessages = [...oldMessages, ...messages].reverse();

  console.log(allMessages);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <div className="all-messages-section" ref={containerRef}>
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
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

      <FileMenu anchorEl={fileMenuAnchor} />
    </>
  );
};

export default AppLayout()(Chat);
