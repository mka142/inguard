import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSpaces, setSelected } from "../spaceSlice";
import { useParams } from "react-router-dom";

const FetchSpace = ({ uuid = "url", selected = true, ...props }) => {
  let { spaceUuid } = useParams();

  useEffect(() => {
    let originalUuid = spaceUuid;
    if (uuid !== "url") {
      originalUuid = uuid;
    }

    if (!props.space.space.map((e) => e.uuid).includes(originalUuid)) {
      props.fetchSpaces(originalUuid);
    } else {
      let space = props.space.space.find((e) => e.uuid === originalUuid);
      if (selected && props.space.selected !== space.uuid) {
        props.setSelected(space.uuid);
      }
    }
  }, [spaceUuid, uuid, selected, props.space]);

  return <>{props.children}</>;
};

const mapStateToProps = (state) => {
  return { space: state.space };
};

export default connect(mapStateToProps, { fetchSpaces, setSelected })(
  FetchSpace
);
