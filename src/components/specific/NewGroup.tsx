import { useState } from "react";
import { useAppDispatch, useAppSelector, useErrors } from "../../hooks/hooks";
import { selectMiscState, setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import Skeleton from "../shared/Skeleton";
import toast from "react-hot-toast";

const NewGroup = () => {

  const [groupName, setGroupName] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  console.log(selectedMembers);

  const dispatch = useAppDispatch();

  const { isNewGroup } = useAppSelector(selectMiscState);
  const { data, isLoading, isError, error } = useAvailableFriendsQuery({});
  const [newGroup, { isLoading: isNewGroupLoading, isError: isNewGroupError, error: newGroupError }] = useNewGroupMutation();

  console.log(newGroupError);
  console.log(newGroupError);
  console.log(isNewGroupLoading);
  console.log(newGroup);
  console.log(isNewGroupError);


  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  console.log(data?.friends);



  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  console.log(groupName);


  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  const submitHandler = () => {

    if (!groupName) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup({
      name: groupName,
      members: selectedMembers,
    });


    closeHandler();
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
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
                handlerIsLoading={isLoading} // Add this line
              />
            ))
          )}

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
