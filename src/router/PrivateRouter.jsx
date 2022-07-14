import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = () => {
  let location = useLocation();
  // const { user } = useSelector((state) => state.auth);
  // console.log("BUUURAAAAYAAAA BAAAAK --> 1111");
  // console.log(user)
  // console.log("BUUURAAAAYAAAA BAAAAK --> 2222");

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // console.log("BUUURAAAAYAAAA BAAAAK --> ÇALIŞMADI");

    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // console.log("BUUURAAAAYAAAA BAAAAK --> ÇALIŞTI");

  return <Outlet />;
};

export default PrivateRouter;
