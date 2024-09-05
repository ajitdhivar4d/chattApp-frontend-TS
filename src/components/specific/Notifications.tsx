import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectMiscState, setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const dispatch = useAppDispatch();
  const { isNotification } = useAppSelector(selectMiscState);
  const data = [1, 2, 3];

  return (
    <>
      <div
        style={{ display: isNotification ? "block" : "none" }}
        className="notification-dialog-overlay"
        id="dialog-overlay"
        onClick={() => dispatch(setIsNotification(false))}
      ></div>
      <div className="notification-dialog-content" id="dialog-content">
        <h2>Notifications</h2>
        {data.map(() => (
          <NotificationItem key={Math.random()} />
        ))}
      </div>
    </>
  );
};

const NotificationItem = memo(() => {
  const name = "John Doe"; // replace with actual data
  return (
    <div className="notificationItem">
      <li>
        <div>
          {/* one */}
          <div>AvatarCard</div>

          {/* two */}
          <p>{`${name} sent you a friend request.`}</p>

          {/* three */}
          <div style={{ display: "flex" }}>
            <button>Accept</button>
            <button>Reject</button>
          </div>
        </div>
      </li>
    </div>
  );
});

export default Notifications;
