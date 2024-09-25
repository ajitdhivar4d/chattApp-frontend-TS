import { lazy, Suspense } from "react";
import { BiPlus, BiSearch, BiSolidNotification } from "react-icons/bi";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectMiscState,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import axios from "axios";
import { server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import { selectChatState } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));

const Header = () => {
  const dispatch = useAppDispatch();
  const { isSearch, isNewGroup, isNotification } =
    useAppSelector(selectMiscState);

  const { notificationCount } = useAppSelector(selectChatState);

  const navigate = useNavigate();

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="header-container-box">
        <header className="app-bar">
          <div className="toolbar">
            {/* // */}
            <h6 className="typography-h6">NewChat</h6>

            <div className="menu-box">
              <button className="icon-button" aria-label="menu">
                <BsFillMenuButtonWideFill color="black" size={24} />
              </button>
            </div>

            <div className="grow-box" />

            <div className="search-newGroup-manageGroup-notification-logout-box">
              <IconBtn
                title={"Search"}
                icon={<BiSearch color="black" size={24} />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<BiPlus color="black" size={24} />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<HiUserGroup color="black" size={24} />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<BiSolidNotification color="black" size={24} />}
                onClick={openNotification}
                value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<GrLogout color="black" size={24} />}
                onClick={logoutHandler}
              />
            </div>
          </div>
        </header>
      </div>
      {/* // */}
      {isSearch && (
        <Suspense fallback={<div>Loading...</div>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<div>Loading...</div>}>
          <NewGroupDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<div>Loading...</div>}>
          <NotificationDialog />
        </Suspense>
      )}
    </>
  );
};

interface IconBtnProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  value?: number;
}

const IconBtn: React.FC<IconBtnProps> = ({ title, icon, onClick, value }) => {
  return (
    <div className="tooltip-container">
      <button className="tooltip-target" onClick={onClick}>
        {icon}
        <div className="tooltip-content">{title}</div>
        {value}
      </button>
    </div>
  );
};

export default Header;
