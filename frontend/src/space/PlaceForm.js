import { connect } from "react-redux";
import { fetchPlaces } from "../space/placeSlice";
import { fetchSpaces } from "../space/spaceSlice";

import { Form, Field } from "react-final-form";

import { Box, FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import PropTypes from "prop-types";

import FieldText from "../base/mui-final-form/FieldText";
import FieldImage from "../base/mui-final-form/FieldImage";

/*
Form used to pass new data to create or update item
*/
const PlaceForm = ({
  initialValues = {},
  _error = {},
  image = null,
  ...props
}) => {
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
                  required={false}
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

export default connect(null, { fetchPlaces, fetchSpaces })(PlaceForm);
