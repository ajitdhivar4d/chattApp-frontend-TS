import { lazy, memo, Suspense, useEffect, useState } from "react";
import { BiEdit, BiMenu } from "react-icons/bi";
import { MdDone, MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../styles/styledComponent";
import { FiDelete } from "react-icons/fi";
import { selectMiscState, setIsAddMember } from "../redux/reducers/misc";
import { useAppDispatch, useAppSelector, useErrors } from "../hooks/hooks";
import { GrAdd } from "react-icons/gr";
import UserItem from "../components/shared/UserItem";
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import Skeleton from "../components/shared/Skeleton";
import Avatar from "../components/shared/Avatar";


interface Group {
  _id: string;
  groupChat: boolean;
  name: string;
  avatar: string[];
}

const AddMemberDialog = lazy(
  () => import("../components/dialogs/AddMemberDialog"),
);

const ConfirmDeleteDialog = lazy(
  () => import("../components/dialogs/ConfirmDeleteDialog"),
);

const Groups = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("group") as string | null


  const w = "100%";

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAddMember } = useAppSelector(selectMiscState);
  const { data: myGroupsData, isError: myGroupsIsError, error: myGroupsError, isLoading: myGroupsIsLoading } = useMyGroupsQuery();
  const { data: groupDetails, isError: groupDetailsIsError, error: groupDetailsError } = useChatDetailsQuery(
    { chatId: chatId!, populate: true },
    { skip: !chatId }
  );
  const [renameGroup] = useRenameGroupMutation();
  const [removeGroupMember, { isLoading: removeGroupMemberIsLoading }] = useRemoveGroupMemberMutation();
  const [deleteGroup] = useDeleteChatMutation();



  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState<string>("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState<string>("");

  const [members, setMembers] = useState<any[]>([]);


  const errors = [
    {
      isError: myGroupsIsError,
      error: myGroupsError,
    },
    {
      isError: groupDetailsIsError,
      error: groupDetailsError,
    },
  ];

  useErrors(errors);


  useEffect(() => {
    if (groupDetails) {
      setGroupName(groupDetails.chat.name);
      setGroupNameUpdatedValue(groupDetails.chat.name);
      setMembers(groupDetails.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  console.log(isMobileMenuOpen);



  const updateGroupName = () => {
    setIsEdit(false);
    if (chatId) {
      renameGroup({
        chatId,
        name: groupNameUpdatedValue,
      });
    }
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    if (chatId) {
      deleteGroup({ chatId });
      closeConfirmDeleteHandler();
      navigate("/groups");
    }
  };


  const removeMemberHandler = (userId: string) => {
    if (chatId) {
      removeGroupMember({ chatId, userId });
    }
  };


  // useEffect(() => {
  //   if (chatId) {
  //     setGroupName(`Group Name ${chatId}`);
  //     setGroupNameUpdatedValue(`Group Name ${chatId}`);
  //   }

  //   return () => {
  //     setGroupName("");
  //     setGroupNameUpdatedValue("");
  //     setIsEdit(false);
  //   };
  // }, [chatId]);

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

  return myGroupsIsLoading ? (
    <div >Loading...</div>
  ) : (
    <div className="groupLayout-grid-container">
      {/* one */}
      <div className="group-grid-item_1 group-grid-item">
        <GroupsList myGroups={myGroupsData?.groups || []} w={w} chatId={chatId || ''} />
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

              {/* Members */}

              {removeGroupMemberIsLoading ? (
                <Skeleton />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}

            </div>
            {ButtonGroup}
          </>
        )}
      </div>
      {isAddMember && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddMemberDialog chatId={chatId!} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmDeleteDialog open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler} />
        </Suspense>
      )}

      <div className="DrawerForMobile">
        <GroupsList w={"50vw"} myGroups={myGroupsData?.groups || []} chatId="" />
      </div>
    </div>
  );
};

const GroupsList = ({
  w = "100%",
  myGroups = [],
  chatId,
}: {
  w: string;
  myGroups: Group[];
  chatId: string;
}): JSX.Element => (
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
        <GroupListItem key={group._id} group={group} chatId={chatId} />
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
          <Avatar src={avatar} size={100}/>
          <p>{name}</p>
        </div>
      </Link>
    );
  },
);

export default Groups;
