
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { Field } from "react-final-form";

const filter = createFilterOptions();

export default ({ options, name, label = "" }) => {
  return (
    <Field name={name} defaultValue={[]}>
      {({ meta, ..._props }) => (
        <Autocomplete
          name={_props.input.name}
          value={_props.input.value}
          defaultValue={[]}
          multiple
          freeSolo
          options={options}
          onChange={(e, value) => {
            const parsed = value.map((e) =>
              typeof e === "string" ? e : e.inputValue
            );
            _props.input.onChange(parsed);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label={label} />
          )}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== "" && !isExisting) {
              filtered.push({ inputValue, title: `Add "${inputValue}"` });
            }

            return filtered;
          }}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.title;
            }
          }}
        />
      )}
    </Field>
  );
};
