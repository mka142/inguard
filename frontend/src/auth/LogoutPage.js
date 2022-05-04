import { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "./authSlice";

import { Navigate } from "react-router-dom";

const LogoutPage = (props) => {
  useEffect(() => {
    props.logout();
  }, []);

  if (!props.isSignIn) {
    return <Navigate to="/" />;
  }
  return <></>;
};

const mapStateToProps = (state) => {
  return { isSignIn: state.auth.isSignIn };
};

export default connect(mapStateToProps, { logout })(LogoutPage);
