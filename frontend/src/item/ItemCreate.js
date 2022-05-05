import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createItem, setSelected } from "./itemSlice";
import { fetchSpaces } from "../space/spaceSlice";
import { useParams, useNavigate } from "react-router-dom";

import { setAppBar } from "../dashboard/appBarSlice";

import ItemForm from "./ItemForm";

import { Box } from "@mui/material";

const ItemCreate = (props) => {
  const { spaceUuid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const space = props.space.space.find((e) => e.uuid === spaceUuid);
    if (!space) {
      props.fetchSpaces();
    } else {
      props.setAppBar({
        title: `Add new Item to ${space.name}`,
        back: true,
        backLink: `/space/${spaceUuid}`,
        info: false,
        add: false,
        search: false,
      });
    }
  }, [props.space, spaceUuid]);

  const onSubmit = (data) => {
    data.image = data.image[0];
    props.createItem({ space: spaceUuid, ...data });
  };

  useEffect(() => {
    if (props.isError) {
    }
  }, [props.isError]);

  useEffect(() => {
    if (props.selected) {
      navigate(`../item/${props.selected}`);
    }
  }, [props.selected]);

  const parseErrors = () => {
    const errors = { ...props.error };
    if (props.error.hasOwnProperty("non_field_errors")) {
      errors.FORM_ERROR = errors.non_field_errors[0];
      delete errors.non_field_errors;
    }
    return errors;
  };

  return (
    <Box p={2}>
      <ItemForm
        spaceUuid={spaceUuid}
        onSubmit={onSubmit}
        loading={props.isLoading}
        _error={props.isError ? parseErrors() : {}}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    space: state.space,
    isLoading: state.item.isLoading,
    isError: state.item.isError,
    error: state.item.error,
    selected: state.item.selected,
  };
};

export default connect(mapStateToProps, {
  createItem,
  setAppBar,
  fetchSpaces,
  setSelected,
})(ItemCreate);
