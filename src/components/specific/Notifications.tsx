import { FC, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector, useErrors } from "../../hooks/hooks";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { selectMiscState, setIsNotification } from "../../redux/reducers/misc";
import Avatar from "../shared/Avatar";
import Skeleton from "../shared/Skeleton";

interface NotificationItemProps {
  sender: { name: string; avatar: string };
  _id: string;
  handler: (data: { _id: string; accept: boolean }) => void;
}

const Notifications = () => {
  const dispatch = useAppDispatch();

  const { isNotification } = useAppSelector(selectMiscState);

  const { data, isLoading, isError, error } = useGetNotificationsQuery();

  const [
    acceptFriendRequest,
    { isLoading: isAccepting, isError: isAcceptError },
  ] = useAcceptFriendRequestMutation();

  const friendRequestHandler = useCallback(
    async ({ _id, accept }: { _id: string; accept: boolean }) => {
      try {
        await acceptFriendRequest({
          requestId: _id,
          accept,
        }).unwrap();
        dispatch(setIsNotification(false));
      } catch (error) {
        console.error("Failed to handle friend request:", error);
      }
    },
    [acceptFriendRequest, dispatch],
  );

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <>
      {isNotification && (
        <>
          <div
            className="notification-dialog-overlay"
            id="dialog-overlay"
            onClick={closeHandler}
          ></div>
          <div className="notification-dialog-content" id="dialog-content">
            <h2>Notifications</h2>

            {isLoading ? (
              <Skeleton variant="text" width="100%" height="20px" />
            ) : isError ? (
              <div className="error">Failed to load notifications.</div>
            ) : (
              <>
                {(data?.allRequests?.length ?? 0) > 0 ? (
                  data?.allRequests?.map(({ sender, _id }) => (
                    <NotificationItem
                      sender={sender}
                      _id={_id}
                      handler={friendRequestHandler}
                      key={_id}
                    />
                  ))
                ) : (
                  <h4 style={{ textAlign: "center" }}>0 notifications</h4>
                )}
              </>
            )}

            {isAccepting && <div>Processing...</div>}
            {isAcceptError && <div>Failed to process the request.</div>}
          </div>
        </>
      )}
    </>
  );
};

const NotificationItem: FC<NotificationItemProps> = memo(
  ({ sender, _id, handler }) => {
    const { name, avatar } = sender;

    return (
      <div className="notificationItem">
        <li style={{ listStyle: "none" }}>
          <div>
            {/* one */}
            <Avatar src={avatar} size={40} />

            {/* two */}
            <p>{`${name} sent you a friend request.`}</p>

            {/* three */}
            <div style={{ display: "flex" }}>
              <button onClick={() => handler({ _id, accept: true })}>
                Accept
              </button>
              <button onClick={() => handler({ _id, accept: false })}>
                Reject
              </button>
            </div>
          </div>
        </li>
      </div>
    );
  },
);

export default Notifications;
