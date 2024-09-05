import { JSX } from "react/jsx-runtime";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Header from "./Header";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent: any) => {
  return (props: JSX.IntrinsicAttributes) => {
    const params = useParams();

    const chatId = params.chatId;

    //  const { user } = useSelector((state) => state.auth);
    const user = {};
    return (
      <>
        <Title />
        <Header />
        <div className="appLayout-grid-container">
          {/* one */}
          <div className="grid-item_1 grid-item">
            <ChatList />
          </div>

          {/* two */}
          <div className="grid-item_2 grid-item">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </div>

          {/* three */}
          <div className="grid-item_3 grid-item">
            <Profile />
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
