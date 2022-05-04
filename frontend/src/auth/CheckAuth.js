import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserInfo } from "./authSlice";

const CheckAuth = (props) => {
  useEffect(() => {
    props.fetchUserInfo();
  }, [props.isSignIn]);

  if (props.isSignIn !== null) {
    return <>{props.children}</>;
  }
  return <></>;
};

const mapStateToProps = (state) => {
  return { isSignIn: state.auth.isSignIn };
};

export default connect(mapStateToProps, { fetchUserInfo })(CheckAuth);
