import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSelected, fetchItems } from "./itemSlice";
import {
  fetchSpaces,
  setSelected as setSelectedSpace,
} from "../space/spaceSlice";
import { setAppBar } from "../dashboard/appBarSlice";

import { useNavigate, useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { Img } from "../base";

const Item = (props) => {
  const navigate = useNavigate();
  const { itemUuid, spaceUUid } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const item = props.items.find((e) => e.uuid === itemUuid);

    if (props.space) {
      props.setSelectedSpace(item.space.uuid);
    }
    if (item) {
      setItem(item);
      props.setSelected(item.uuid);
      props.setAppBar({
        back: true,
        backLink: `/space/${item.space}`,
        title: item.name,
      });
    } else {
      props.fetchItems({ uuid: itemUuid });
      props.fetchSpaces(spaceUUid);
    }
  }, [itemUuid, props.space, props.items]);

  useEffect(() => {
    props.setAppBar({ loading: props.isLoading });
  }, [props.isLoading]);

  useEffect(() => {
    if (props.isError) {
      navigate("/");
    }
  }, [props.isError]);

  if (!item) {
    return <></>;
  }

  return (
    <Box>
      <Box>
        <Img src={item.image} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state, props) => {
  return {
    items: state.item.items,
    isLoading: state.item.isLoading,
    isError: state.item.isError,
    space: state.space.space.find((e) => e.uuid === state.space.selected),
  };
};

export default connect(mapStateToProps, {
  setSelected,
  setSelectedSpace,
  fetchItems,
  setAppBar,
  fetchSpaces,
})(Item);
