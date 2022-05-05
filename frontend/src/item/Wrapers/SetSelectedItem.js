import { useEffect } from "react";
import { connect } from "react-redux";
import { setSelected } from "../itemSlice";

import { useParams } from "react-router-dom";

const SetSelectedItem = (props) => {
  const { itemUuid } = useParams();

  useEffect(() => {
    if (itemUuid) {
      props.setSelected(itemUuid);
    }
  }, [itemUuid]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return { selected: state.item.selected };
};

export default connect(null, { setSelected })(SetSelectedItem);
