import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../itemSlice";

const FetchSpaceItems = (props) => {
  useEffect(() => {
    if (props.selectedSpace) {
      props.fetchItems({ space: props.selectedSpace });
    }
  }, [props.selectedSpace]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return { selectedSpace: state.space.selected };
};

export default connect(mapStateToProps, { fetchItems })(FetchSpaceItems);
