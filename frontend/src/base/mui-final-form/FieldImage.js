import { FormControl, FormLabel, Button, Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import Img from "../Img";
import FileField from "../FileField";

export default ({ name, ...props }) => (
  <FormControl variant="standard" fullWidth>
    <FormLabel htmlFor={`${name}_field`}>{props.label}</FormLabel>
    <FileField
      id={`${name}_field`}
      name={name}
      dropZoneProps={{
        accept: { "image/*": [".jpeg", ".png"] },
        multiple: false,
      }}
      render={(_props) => (
        <>
          <Button fullWidth variant="outlined">
            <ImageIcon />
          </Button>
          {props.image && !_props.input.value ? (
            <Box display="flex" flexDirection="column">
              <Img width={100} height={"auto"} src={props.image} />
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    />
  </FormControl>
);
