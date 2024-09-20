import { useState } from "react";
import { useAppDispatch, useErrors } from "../../hooks/hooks";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import Skeleton from "../shared/Skeleton";

const AddMemberDialog = ({ chatId }: { chatId: string }) => {
  const dispatch = useAppDispatch();

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);



  const { isLoading, data: availableFriendsData, isError: isAvailableFriendsError, error: availableFriendsError } = useAvailableFriendsQuery({ chatId });

  const [addGroupMembers,{isLoading:isLoadingAddGroupMembers}] = useAddGroupMembersMutation();


  const selectMemberHandler = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addGroupMembers({ members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError: isAvailableFriendsError, error: availableFriendsError }]);


  return (
    <div className="AddMembersDialog-container">
      <div className="AddMembersDialog-section-main">
        <dialog style={{ textAlign: "center" }} title="Add Member">
          Add Member
        </dialog>

        {/* one */}
        <div className="AddMembersDialog-section-one">
          {isLoading ? (
            <Skeleton />
          ) : availableFriendsData?.friends?.length ?? 0 > 0 ? (
            availableFriendsData?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <h5>No Friends</h5>
          )}
        </div>
        <div className="AddMembersDialog-section-two">
          <button onClick={closeHandler}>Cancel</button>
          <button onClick={addMemberSubmitHandler}disabled={isLoadingAddGroupMembers} >Submit Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberDialog;
