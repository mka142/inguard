import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPlaces } from "../space/placeSlice";
import { fetchSpaces } from "../space/spaceSlice";
import { fetchTags } from "./itemSlice";
import { useParams } from "react-router-dom";

import { Form, Field } from "react-final-form";
import FileField from "../base/FileField";

import { Img } from "../base";

import {
  FormControl,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ImageIcon from "@mui/icons-material/Image";
import PropTypes from "prop-types";

import FieldText from "../base/mui-final-form/FieldText";
import FieldImage from "../base/mui-final-form/FieldImage";
import FieldAutoComplete from "../base/mui-final-form/FieldAutoComplete";

/*
Form used to pass new data to create or update item
*/
const ItemForm = ({
  spaceUuid,
  initialValues = {},
  _error = {},
  image = null,
  ...props
}) => {
  useEffect(() => {
    const space = props.space.space.find((e) => e.uuid === spaceUuid);
    props.fetchTags();
    if (!space) {
      props.fetchSpaces();
    }
    props.fetchPlaces({ space: spaceUuid });
  }, [spaceUuid]);

  const _onSubmit = (data) => {
    props.onSubmit(data);
  };

  return (
    <>
      <Form
        initialValues={initialValues}
        initialValuesEqual={() => true}
        onSubmit={_onSubmit}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Name is required";
          }

          if (!values.place) {
            errors.place = "Place is required";
          }
          return errors;
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column">
              <Box my={1}>
                <FieldText name="name" label="Name" />
              </Box>
              <Box my={1}>
                <FieldText
                  name="description"
                  label="Description"
                  multiline
                  minRows={2}
                />
              </Box>
              <Box my={1}>
                <Field name="place" type="radio">
                  {({ meta, ..._props }) => {
                    return (
                      <FormControl
                        variant="standard"
                        error={meta.error && meta.touched}
                        fullWidth
                        required
                      >
                        <FormLabel id="place_field">Place</FormLabel>
                        <RadioGroup
                          {...(meta.initial && { defaultValue: meta.initial })}
                          row
                          aria-labelledby="place_field"
                          {..._props.input}
                        >
                          {props.place.place
                            .filter((e) => e.space === spaceUuid)
                            .map((e) => (
                              <FormControlLabel
                                key={e.uuid}
                                value={e.uuid}
                                control={<Radio />}
                                label={e.name}
                              />
                            ))}
                        </RadioGroup>
                        <FormHelperText>
                          {meta.error && meta.touched ? meta.error : ""}
                        </FormHelperText>
                      </FormControl>
                    );
                  }}
                </Field>
              </Box>
              <Box my={1}>
                <FieldAutoComplete
                  options={props.tags.map((e) => e.name)}
                  name="tags"
                  label="Tags"
                />
              </Box>
              <Box my={1}>
                <FieldImage name="image" label="Image" image={image} />
              </Box>
              <Box my={4}>
                <LoadingButton
                  loading={props.loading}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Save
                </LoadingButton>
                <FormHelperText error={Boolean(_error.FORM_ERROR)}>
                  {_error.FORM_ERROR ? _error.FORM_ERROR : ""}
                </FormHelperText>
              </Box>
            </Box>
          </form>
        )}
      />
    </>
  );
};
ItemForm.propTypes = {
  spaceUuid: PropTypes.string,
  initialValues: PropTypes.object,
  _error: PropTypes.shape({ FORM_ERROR: PropTypes.string }),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    space: state.space,
    place: state.place,
    tags: state.item.tags,
  };
};

export default connect(mapStateToProps, {
  fetchPlaces,
  fetchSpaces,
  fetchTags,
})(ItemForm);
