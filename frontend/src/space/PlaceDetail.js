import { useEffect } from "react";

import { connect } from "react-redux";
import { setAppBar } from "../dashboard/appBarSlice";
import { setSelected } from "./placeSlice";

import { Box } from "@mui/material";

import { Img, DetailBox } from "../base";

const PlaceDetail = ({ item, space, place, ...props }) => {
  useEffect(() => {
    if (!space || !place) return;

    let backLink;
    if (item) {
      backLink = `/space/${space.uuid}/item/${item}`;
    } else {
      backLink = `/space/${space.uuid}/detail`;
    }

    props.setAppBar({
      back: true,
      backLink: backLink,
      title: place.name,
      search: false,
      add: false,
      info: false,
      edit: false,
      remove: false,
    });
  }, [item, space, place]);

  if (!place || !space) {
    return null;
  }

  return (
    <>
      <Box display="flex" p={2} flexDirection="column">
        <Box>
          <Img width={"100%"} src={place.image} />
        </Box>
        <DetailBox name="Name" value={place.name} />
        <DetailBox name="Description" value={place.description} />
        <DetailBox name="Space" value={space.name} />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  const place = Object(
    state.place.place.find((e) => e.uuid === state.place.selected)
  );
  const space = Object(
    state.space.space.find((e) => e.uuid === state.space.selected)
  );

  return {
    item: state.item.selected,
    space,
    place,
  };
};

export default connect(mapStateToProps, {
  setAppBar,
  setSelected,
})(PlaceDetail);
