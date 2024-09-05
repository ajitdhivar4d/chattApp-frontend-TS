import { FaAt, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePersonPin } from "react-icons/md";
import { transformImage } from "../../lib/features";

let img =
  "https://i.pinimg.com/736x/55/33/5c/55335c708ac05d8f469894d08e2671fa.jpg";

const Profile = () => {
  const imgC = transformImage(img);
  const bio = "This is a bio of a person.";
  const username = "Johndoe";
  const name = "John Doe";
  const joinDate = "2 days ago";

  return (
    <div className="profile-container">
      {/* one */}
      <div className="profile-img">
        <img src={imgC} alt="" />
      </div>

      {/* two */}
      <div className="profile-bio">
        <p>{bio}</p>
        <span>Bio</span>
      </div>

      {/* three */}
      <div className="profile-username">
        <FaAt size={20} />
        <div>
          <p>{username}</p>
          <span>Username</span>
        </div>
      </div>

      {/* four */}
      <div className="profile-name">
        <MdOutlinePersonPin size={20} />
        <div>
          <p>{name}</p>
          <span>Name</span>
        </div>
      </div>

      {/* five */}
      <div className="profile-joinDate">
        <FaRegCalendarAlt size={20} />
        <div>
          <p>{joinDate}</p>
          <span>Joined</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
