import { useEffect } from "react";
import { connect } from "react-redux";
import { setAppBar } from "../dashboard/appBarSlice";
import { createPlace } from "./placeSlice";
import { useNavigate } from "react-router-dom";

import PlaceForm from "./PlaceForm";
import { Box } from "@mui/material";

const PlaceCreate = ({ space, ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!space) return;
    props.setAppBar({
      title: `Add new Place to ${space.name}`,
      back: true,
      backLink: `/space/${space.uuid}`,
      edit: false,
      search: false,
      remove: false,
      add: false,
    });
  }, [space]);

  const onSubmit = async (data) => {
    if (data.image) {
      data.image = data.image[0];
    }
    const response = await props.createPlace({
      space: space.uuid,
      ...data,
    });
    if (response.meta.requestStatus === "fulfilled") {
      navigate(`/space/${space.uuid}`);
    }
  };

  return (
    <Box p={2}>
      <PlaceForm onSubmit={onSubmit} loading={props.isLoading} />
    </Box>
  );
};

const mapStateToProps = (state) => {
  const space = state.space.space.find((e) => e.uuid === state.space.selected);
  return {
    space,
    isLoading: state.place.isLoading,
    isError: state.place.isError,
    error: state.place.error,
  };
};

export default connect(mapStateToProps, { setAppBar, createPlace })(
  PlaceCreate
);
