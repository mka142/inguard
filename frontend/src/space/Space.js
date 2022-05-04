import { useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  matchPath,
  Outlet,
} from "react-router-dom";

import { connect } from "react-redux";
import { setSelected, fetchSpaces } from "./spaceSlice";
import { setSelected as setItemSelected } from "../item/itemSlice";
import { setAppBar } from "../dashboard/appBarSlice";

const Space = (props) => {
  let { spaceUuid } = useParams();
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    props.setItemSelected(null);
    if (!props.space.space.map((e) => e.uuid).includes(spaceUuid)) {
      props.fetchSpaces(spaceUuid);
    } else {
      let space = props.space.space.find((e) => e.uuid === spaceUuid);
      props.setSelected(space.uuid);
      props.setAppBar({
        add: true,
        title: space.name,
        back: true,
        backLink: "/",
      });
    }
  }, [spaceUuid, props.space.space]);

  useEffect(() => {
    if (props.space.isError) {
      navigate("/");
    }
  }, [props.space.isError]);

  return <Outlet />;
};

const mapStateToProps = (state, props) => {
  return { space: state.space };
};

export default connect(mapStateToProps, {
  setSelected,
  fetchSpaces,
  setAppBar,
  setItemSelected,
})(Space);
