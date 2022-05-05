import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPlaces } from "../space/placeSlice";
import { fetchSpaces } from "../space/spaceSlice";
import { useParams } from "react-router-dom";

import { Form, Field } from "react-final-form";
import FileField from "../base/FileField";

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

const ItemForm = ({
  spaceUuid,
  initialValues = {},
  _error = {},
  image,
  ...props
}) => {
  useEffect(() => {
    const space = props.space.space.find((e) => e.uuid === spaceUuid);
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
                <Field name="name">
                  {({ meta, ...props }) => (
                    <TextField
                      {...props.input}
                      fullWidth
                      variant="standard"
                      required
                      error={meta.error && meta.touched}
                      label="Name"
                      helperText={meta.error && meta.touched ? meta.error : ""}
                    />
                  )}
                </Field>
              </Box>
              <Box my={1}>
                <Field name="description">
                  {(props) => (
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Description"
                      multiline
                      minRows={2}
                      {...props.input}
                    />
                  )}
                </Field>
              </Box>
              <Box my={1}>
                <Field name="place" type="radio">
                  {({ meta, ..._props }) => (
                    <FormControl
                      variant="standard"
                      error={meta.error && meta.touched}
                      fullWidth
                      required
                    >
                      <FormLabel id="place_field">Place</FormLabel>
                      <RadioGroup
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
                  )}
                </Field>
              </Box>
              <Box my={1}>
                <FormControl variant="standard" fullWidth>
                  <FormLabel htmlFor="image_field">Image</FormLabel>
                  <FileField
                    id="image_field"
                    name="image"
                    dropZoneProps={{
                      accept: { "image/*": [".jpeg", ".png"] },
                      multiple: false,
                    }}
                  >
                    <>
                      <Button fullWidth variant="outlined">
                        <ImageIcon />
                      </Button>
                      {image && !values.image ? (
                        <Box display="flex" flexDirection="column">
                          <img width={100} height={"auto"} src={props.image} />
                        </Box>
                      ) : (
                        <></>
                      )}
                    </>
                  </FileField>
                </FormControl>
              </Box>
              <Box my={4}>
                <LoadingButton
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Save
                </LoadingButton>
                <FormHelperText error={_error.FORM_ERROR}>
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

const mapStateToProps = (state) => {
  return {
    space: state.space,
    place: state.place,
  };
};

export default connect(mapStateToProps, { fetchPlaces, fetchSpaces })(ItemForm);
