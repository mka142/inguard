import { useEffect, useState } from "react";

import { useNavigate, Outlet } from "react-router-dom";

import { connect } from "react-redux";
import { setSelected, fetchSpaces } from "./spaceSlice";
import { setSelected as setItemSelected } from "../item/itemSlice";
import { setAppBar } from "../dashboard/appBarSlice";
import AppBarListener from "../dashboard/AppBarListener";

import CategoryIcon from "@mui/icons-material/Category";
import RoomIcon from "@mui/icons-material/Room";

import { MenuDialog, MenuItem } from "../base";

const Space = (props) => {
  let navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    props.setItemSelected(null);
    if (props.space.selected) {
      let space = props.space.space.find(
        (e) => e.uuid === props.space.selected
      );
      props.setSelected(space.uuid);
      props.setAppBar({
        search: true,
        add: true,
        title: space.name,
        back: true,
        backLink: "/",
        info: true, //change to true when addin space info panel
        remove: false,
      });
    }
  }, [props.space.selected]);

  useEffect(() => {
    if (props.space.isError) {
      navigate("/");
    }
  }, [props.space.isError]);

  return (
    <>
      <AppBarListener on="addClicked" onClick={() => setDialogOpen(true)} />
      <AppBarListener on="infoClicked" onClick={() => navigate("detail")} />
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
        <MenuItem icon={<RoomIcon />} onClick={() => navigate("new-place")}>
          Space Place
        </MenuItem>
      </MenuDialog>
      <Outlet />
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    space: state.space,
    addClicked: state.appBar.addClicked,
  };
};

export default connect(mapStateToProps, {
  setSelected,
  fetchSpaces,
  setAppBar,
  setItemSelected,
})(Space);
