import { CgAdd } from "react-icons/cg";
import { CiCircleRemove } from "react-icons/ci";
import { SearchUser } from "../../redux/api/api";
import Avatar from "./Avatar";

interface UserItemProps {
  user: SearchUser;
  isAdded?: boolean;
  styling?: React.CSSProperties;
  handler: (userId: string) => void;
  handlerIsLoading?: boolean;
}

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}: UserItemProps) => {
  const { name, _id, avatar } = user;

  return (
    <li className="userItem-container" style={{listStyle:"none"}}>
      <div style={styling}>
        {/* one */}
        <Avatar src={avatar} size={40} alt="User's Avatar" />

        {/* two */}
        <div className="typography">{name}</div>

        {/* three */}
        <button onClick={() => handler(_id)} disabled={handlerIsLoading}>
          {isAdded ? (
            <CiCircleRemove size={24} color="red" />
          ) : (
            <CgAdd size={24} color="lightGreen" />
          )}
        </button>
      </div>
    </li>
  );
};

export default UserItem;
