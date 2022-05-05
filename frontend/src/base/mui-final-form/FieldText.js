import { Field } from "react-final-form";

import { TextField } from "@mui/material";

export default ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ meta, ..._props }) => (
        <TextField
          {..._props.input}
          error={meta.error && meta.touched}
          helperText={meta.error && meta.touched ? meta.error : ""}
          fullWidth
          required
          variant="standard"
          label={name}
          {...props}
        />
      )}
    </Field>
  );
};
