import { useAppDispatch } from "../../hooks/hooks";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
const isLoading = false;

const AddMemberDialog = () => {
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    console.log("addMemberSubmitHandler");
    closeHandler();
  };
  return (
    <div className="AddMembersDialog-container">
      <div className="AddMembersDialog-section-main">
        <dialog style={{ textAlign: "center" }} title="Add Member">
          Add Member
        </dialog>

        {/* one */}
        <div className="AddMembersDialog-section-one">
          {isLoading ? (
            <>
              <UserItem />
              <UserItem />
            </>
          ) : (
            <h5>No Friends</h5>
          )}
        </div>
        <div className="AddMembersDialog-section-two">
          <button onClick={closeHandler}>Cancel</button>
          <button onClick={addMemberSubmitHandler}>Submit Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberDialog;
