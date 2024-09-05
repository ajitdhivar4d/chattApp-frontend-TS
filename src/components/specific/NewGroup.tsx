import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectMiscState, setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const dispatch = useAppDispatch();

  const users = [1, 2, 3, 4];

  const [groupName, setGroupName] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  console.log(groupName);

  const { isNewGroup } = useAppSelector(selectMiscState);

  const submitHandler = () => {
    console.log("submission");

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <>
      <div
        style={{ display: isNewGroup ? "block" : "none" }}
        className="newGroup-dialog-overlay"
        id="dialog-overlay"
        onClick={() => dispatch(setIsNewGroup(false))}
      ></div>
      <div className="newGroup-dialog-content" id="dialog-content">
        {/* one */}
        <div
          style={{
            fontSize: "20px",
            textAlign: "center",
            padding: "16px 24px",
            fontWeight: "bolder",
          }}
        >
          New Group
        </div>

        {/* two */}
        <div className="newGroup-Input">
          <input
            placeholder="Group Name"
            type="text"
            value={groupName}
            onChange={onChangeHandler}
          />
        </div>

        {/* three */}
        <div
          style={{
            fontSize: "16px",
            marginTop: "32px",
            fontWeight: "bolder",
            justifyContent: "start",
          }}
        >
          Members
        </div>

        {/* four */}
        <ul>
          {users.map((user, i) => (
            <UserItem key={user} />
          ))}
        </ul>

        {/* five */}
        <div className="newGroup-btns">
          <button
            onClick={closeHandler}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancel
          </button>
          <button
            onClick={submitHandler}
            style={{ backgroundColor: "green", color: "white" }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default NewGroup;
