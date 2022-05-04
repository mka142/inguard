import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import { setSelected, fetchSpaces } from "./spaceSlice";
import { setTitle, setBack, setAdd } from "../dashboard/appBarSlice";

const Space = (props) => {
  let { uuid } = useParams();

  useEffect(() => {
    props.setBack({ back: true, backUrl: "/" });
    props.setAdd({ add: true });
    if (!props.space.space.map((e) => e.uuid).includes(uuid)) {
      props.fetchSpaces(uuid);
    } else {
      let space = props.space.space.find((e) => e.uuid === uuid);
      props.setSelected({ selected: space.uuid });
      props.setTitle(space.name);
    }
  }, [uuid, props.space.space]);

  return <></>;
};

const mapStateToProps = (state, props) => {
  return { space: state.space };
};

export default connect(mapStateToProps, {
  setSelected,
  fetchSpaces,
  setTitle,
  setBack,
  setAdd,
})(Space);
