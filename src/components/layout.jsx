/* eslint-disable react/prop-types */

import { useAuth } from "../context/auth";

const Layout = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <div className="h-screen">
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
