import { Navigate, Outlet } from "react-router-dom";

interface ProtectRouteProps {
  children?: React.ReactNode;
  user: any; // Replace 'any' with the actual type of the user if known
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
