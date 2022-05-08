import { useEffect } from "react";

import { connect } from "react-redux";
import { setAppBar } from "../dashboard/appBarSlice";
import { setSelected } from "./itemSlice";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, Chip } from "@mui/material";

import { Img, DetailBox, Link } from "../base";
import AppBarListener from "../dashboard/AppBarListener";

const ItemDetail = ({ item, space, place, ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!item || !space) return;
    props.setAppBar({
      back: true,
      backLink: `/space/${space.uuid}/item/${item.uuid}`,
      title: item.name,
      search: false,
      add: false,
      info: false,
      edit: true,
      remove: false,
    });
  }, [item, space]);

  if (!item || !place || !space) {
    return null;
  }

  return (
    <>
      <AppBarListener on="editClicked" onClick={() => navigate("../edit")} />
      <Box display="flex" p={2} flexDirection="column">
        <Box>
          <Img width={"100%"} src={item.image} />
        </Box>
        <DetailBox name="Name" value={item.name} />
        <DetailBox name="Description" value={item.description} />
        <DetailBox
          name="Tags"
          value={
            !item.tags.length
              ? "No tags provided"
              : item.tags.map((e) => <Chip key={e} label={e} />)
          }
        />
        <DetailBox name="Quantity" value={item.quantity} />
        <DetailBox
          name="Place"
          value={
            <Link to={`/space/${space.uuid}/place/${place.uuid}/detail/`}>
              {place.name}
            </Link>
          }
        />
        <DetailBox name="Space" value={space.name} />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  const item = Object(
    state.item.items.find((e) => e.uuid === state.item.selected)
  );

  return {
    item,
    space: state.space.space.find((e) => e.uuid === item.space),
    place: state.place.place.find((e) => e.uuid === item.place),
  };
};

export default connect(mapStateToProps, {
  setAppBar,
  setSelected,
})(ItemDetail);
