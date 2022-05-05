import { useEffect, useState, useRef } from "react";

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
import AppBarListener from "../dashboard/AppBarListener";

import CategoryIcon from "@mui/icons-material/Category";
import RoomIcon from "@mui/icons-material/Room";

import { MenuDialog, MenuItem } from "../base";

const Space = (props) => {
  let { spaceUuid } = useParams();
  let navigate = useNavigate();
  const location = useLocation();

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    props.setItemSelected(null);
    if (!props.space.space.map((e) => e.uuid).includes(spaceUuid)) {
      props.fetchSpaces(spaceUuid);
    } else {
      let space = props.space.space.find((e) => e.uuid === spaceUuid);
      props.setSelected(space.uuid);
      props.setAppBar({
        search: true,
        add: true,
        title: space.name,
        back: true,
        backLink: "/",
        info: false, //change to true when addin space info panel
      });
    }
  }, [spaceUuid, props.space.space]);

  useEffect(() => {
    if (props.space.isError) {
      navigate("/");
    }
  }, [props.space.isError]);

  return (
    <>
      <AppBarListener on="addClicked" onClick={() => setDialogOpen(true)} />
      <MenuDialog
        title="Create new"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        <MenuItem icon={<CategoryIcon />} onClick={() => navigate("new-item")}>
          Space Item
        </MenuItem>
        <MenuItem icon={<RoomIcon />}>Space Place</MenuItem>
      </MenuDialog>
      <Outlet />
    </>
  );
};

const mapStateToProps = (state, props) => {
  return { space: state.space, addClicked: state.appBar.addClicked };
};

export default connect(mapStateToProps, {
  setSelected,
  fetchSpaces,
  setAppBar,
  setItemSelected,
})(Space);
