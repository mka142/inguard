import { useEffect } from "react";
import { connect } from "react-redux";
import { login, logout, fetchUserInfo } from "./authSlice";

import { Navigate } from "react-router-dom";

const EnsureAuthentication = (props) => {
  useEffect(() => {
    props.fetchUserInfo();
  }, [props.isSignIn]);

  if (props.isSignIn) {
    return <>{props.children}</>;
  }
  return <Navigate to={props.loginUrl} replace />;
};

const mapStateToProps = (state) => {
  return { isSignIn: state.auth.isSignIn };
};

export default connect(mapStateToProps, { login, logout, fetchUserInfo })(
  EnsureAuthentication
);
