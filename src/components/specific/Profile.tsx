import { FaAt, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonPin } from "react-icons/md";
import { transformImage } from "../../lib/features";
import moment from "moment";

const Profile = ({ user }: { user: any }) => {
  const imgC = transformImage(user?.avatar?.url);

  return (
    <div className="profile-container">
      {/* one */}
      <div className="profile-img">
        <img src={imgC} alt="" />
      </div>

      {/* two */}
      <div className="profile-bio">
        <p>{user?.bio}</p>
        <span>Bio</span>
      </div>

      {/* three */}
      <div className="profile-username">
        <FaAt size={20} />
        <div>
          <p>{user?.username}</p>
          <span>Username</span>
        </div>
      </div>

      {/* four */}
      <div className="profile-name">
        <MdOutlinePersonPin size={20} />
        <div>
          <p>{user?.name}</p>
          <span>Name</span>
        </div>
      </div>

      {/* five */}
      <div className="profile-joinDate">
        <FaRegCalendarAlt size={20} />
        <div>
          <p>{moment(user?.createdAt).fromNow()}</p>
          <span>Joined</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
