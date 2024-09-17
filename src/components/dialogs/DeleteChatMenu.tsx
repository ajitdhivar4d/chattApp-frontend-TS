import { IoMdExit } from "react-icons/io";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { CSSProperties } from "styled-components";
import { useAppDispatch } from "../../hooks/hooks";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";
import { selectMiscState, setIsDeleteMenu } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

interface DeleteChatMenuProps {
  deleteMenuAnchorEl: HTMLElement | null;
}

const DeleteChatMenu: React.FC<DeleteChatMenuProps> = ({
  deleteMenuAnchorEl,
}) => {
  const dispatch = useAppDispatch();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(selectMiscState);

  const isGroup = selectedDeleteChat?.groupChat;

  // console.log(isGroup);

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };

  const [deleteChat, {}] = useDeleteChatMutation();
  const [leaveGroup, {}] = useLeaveGroupMutation();

  const leaveGroupHandler = async () => {
    closeHandler();

    // Check if chatId is a valid string before calling the API
    const chatId = selectedDeleteChat?.chatId;
    if (!chatId || typeof chatId !== "string") {
      console.error("Invalid chatId:", chatId);
      return;
    }

    try {
      const response = await leaveGroup({ chatId }); // Pass the correct chatId
      console.log("Group left successfully", response);
      if (response.data?.message) {
        toast.success(response.data.message);
      } else if (response.error && "data" in response.error) {
        toast.error(
          (response.error as { data: { message: string } }).data.message,
        );
      }
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  const deleteChatHandler = async () => {
    closeHandler();
    try {
      const res = await deleteChat({ chatId: selectedDeleteChat?.chatId });
      console.log("Chat deleted successfully", res);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Determine positioning based on the anchor element
  const getMenuStyles = (): CSSProperties => {
    if (!deleteMenuAnchorEl) return {};

    const rect = deleteMenuAnchorEl.getBoundingClientRect();

    return {
      position: "absolute",
      top: rect.bottom, // Adjust `40` to position the menu above the anchor element
      left: rect.left + 140,
      zIndex: 1100,
      width: "10rem",
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "10px",
    };
  };

  return (
    <>
      <div
        style={{ display: isDeleteMenu ? "block" : "none" }}
        className="deleteChatMenu-dialog-overlay"
        id="dialog-overlay"
        onClick={closeHandler}
      ></div>
      {isDeleteMenu && deleteMenuAnchorEl && (
        <div className="deleteChatMenu-container" style={getMenuStyles()}>
          <div
            className="deleteChatMenu-section"
            onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
          >
            {isGroup ? (
              <>
                <IoMdExit />
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    margin: 0,
                  }}
                >
                  Leave Group
                </div>
              </>
            ) : (
              <>
                <RiDeleteBin7Line color="red" />
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    margin: 0,
                  }}
                >
                  Delete Chat
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteChatMenu;
