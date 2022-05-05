import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPlaces } from "../placeSlice";

const FetchSpacePlaces = (props) => {
  useEffect(() => {
    if (props.selectedSpace) {
      props.fetchPlaces({ space: props.selectedSpace });
    }
  }, [props.selectedSpace]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return { selectedSpace: state.space.selected };
};

export default connect(mapStateToProps, { fetchPlaces })(FetchSpacePlaces);
