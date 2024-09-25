import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutLoader } from "./components/layout/Loaders";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import NotFound from "./pages/NotFound";
import {
  selectAuthState,
  userExists,
  userNotExists,
} from "./redux/reducers/auth";
import { server } from "./constants/config";
import axios from "axios";
import ProtectRoute from "./components/auth/ProtectRoute";
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));

// Admin
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));

const App = () => {
  const { user, loader } = useAppSelector(selectAuthState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true; // track if the component is mounted

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/user/me`, {
          withCredentials: true,
        });
        if (isMounted) {
          dispatch(userExists(data?.user));
        }
      } catch {
        if (isMounted) {
          dispatch(userNotExists());
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false; // cleanup to avoid state update on unmounted component
    };
  }, [dispatch]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* User  */}
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          {/* // */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
