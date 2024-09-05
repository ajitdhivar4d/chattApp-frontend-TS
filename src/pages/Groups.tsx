import { lazy, memo, Suspense, useState } from "react";
import { BiEdit, BiMenu } from "react-icons/bi";
import { MdDone, MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "../styles/styledComponent";
import { FiDelete } from "react-icons/fi";
import { setIsAddMember } from "../redux/reducers/misc";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { GrAdd } from "react-icons/gr";
import UserItem from "../components/shared/UserItem";

const AddMemberDialog = lazy(
  () => import("../components/dialogs/AddMemberDialog"),
);

const ConfirmDeleteDialog = lazy(
  () => import("../components/dialogs/ConfirmDeleteDialog"),
);

const Groups = () => {
  const chatId = "45";
  const w = "100%";
  const myGroups = [1, 2];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAddMember } = useAppSelector((state) => state.misc);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [groupName, setGroupName] = useState<string>("Group 1");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] =
    useState<string>("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navigateBack = () => {
    navigate("/");
  };

  const updateGroupName = () => {
    setIsEdit(false);
    console.log("updateGroupName");
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  // IconBtns
  const IconBtns = (
    <>
      <div className="groups-iconBtns">
        <button onClick={handleMobile}>
          <BiMenu />
        </button>
      </div>

      <div className="tooltip-iconBtn" title="back">
        <button onClick={navigateBack}>
          <MdKeyboardBackspace />{" "}
        </button>
      </div>
    </>
  );

  // GroupName
  const GroupName = (
    <div className="groupName-section">
      {isEdit ? (
        <>
          <input
            type="text"
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <button onClick={updateGroupName}>
            <MdDone />
          </button>
        </>
      ) : (
        <>
          <h4>{groupName}</h4>
          <button onClick={() => setIsEdit(true)}>
            <BiEdit />
          </button>
        </>
      )}
    </div>
  );

  // ButtonGroup
  const ButtonGroup = (
    <div className="buttonGroup-section">
      <button onClick={openConfirmDeleteHandler}>
        <FiDelete /> Delete Group
      </button>
      <button onClick={openAddMemberHandler}>
        <GrAdd />
        Add Member
      </button>
    </div>
  );

  return (
    <div className="groupLayout-grid-container">
      {/* one */}
      <div className="group-grid-item_1 group-grid-item">
        <GroupsList myGroups={myGroups} w={w} chatId={chatId} />
      </div>

      {/* two */}
      <div className="group-grid-item_2 group-grid-item">
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <div
              style={{
                margin: "2rem",
                alignSelf: "flex-start",
                fontSize: "1rem",
                fontWeight: "400",
                lineHeight: "1.5rem",
              }}
            >
              Members
            </div>
            <div className="members-section">
              <UserItem />
              <UserItem />
            </div>
            {ButtonGroup}
          </>
        )}
      </div>
      {isAddMember && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmDeleteDialog />
        </Suspense>
      )}

      <div className="DrawerForMobile">
        <GroupsList w={"50vw"} myGroups={myGroups} chatId="" />
      </div>
    </div>
  );
};

const GroupsList = ({
  w = "100%",
  myGroups = [1, 2],
  chatId,
}: {
  w: string;
  myGroups: number[];
  chatId: string;
}): any => (
  <div
    style={{
      width: w,
      backgroundColor: "white",
      height: "100vh",
      overflow: "auto",
    }}
    className="GroupsList-section"
  >
    {myGroups.length > 0 ? (
      myGroups.map((group: any) => (
        <GroupListItem group={group} chatId={chatId} />
      ))
    ) : (
      <p style={{ textAlign: "center", padding: "1rem" }}>No groups</p>
    )}
  </div>
);

const GroupListItem = memo(
  ({ group, chatId = "75" }: { group: any; chatId: any }) => {
    const { name = "newG", avatar = "AvatarCard", _id = "asdw5" } = group;
    return (
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId === _id) e.preventDefault();
        }}
        className="GroupListItem-link"
      >
        <div>
          <div className="AvatarCard">{avatar}</div>
          <p>{name}</p>
        </div>
      </Link>
    );
  },
);

export default Groups;
