import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../redux/reducers/auth";

interface ProtectRouteProps {
  children?: React.ReactNode;
  user: User | null; // Replace 'any' with the actual type of the user if known
  redirect?: string;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({
  children,
  user,
  redirect = "/login",
}) => {
  if (!user) return <Navigate to={redirect} />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectRoute;
