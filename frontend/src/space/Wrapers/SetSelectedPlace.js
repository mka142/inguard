import { useEffect } from "react";
import { connect } from "react-redux";
import { setSelected } from "../placeSlice";

import { useParams } from "react-router-dom";

const SetSelectedPlace = (props) => {
  const { placeUuid } = useParams();

  useEffect(() => {
    if (placeUuid) {
      props.setSelected(placeUuid);
    }
  }, [placeUuid]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return { selected: state.item.selected };
};

export default connect(null, { setSelected })(SetSelectedPlace);
