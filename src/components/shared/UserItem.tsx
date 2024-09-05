import { CgAdd } from "react-icons/cg";
import { CiCircleRemove } from "react-icons/ci";

const UserItem = () => {
  const isAdded = false;
  const name = "Mohit";
  return (
    <li className="userItem-container">
      <div>
        {/* one */}
        <div>AvatarCard</div>

        {/* two */}
        <div className="typography">{name}</div>

        {/* three */}
        <div>
          {isAdded ? (
            <CiCircleRemove size={24} color="red" />
          ) : (
            <CgAdd size={24} color="lightGreen" />
          )}
        </div>
      </div>
    </li>
  );
};

export default UserItem;
