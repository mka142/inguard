import { Box, Typography } from "@mui/material";
import { Img } from "../base";

export default () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box mx="auto" mt={3}>
        <Img height={200} src={process.env.PUBLIC_URL + "/logo512.png"} />
      </Box>
      <Typography m="auto" variant="h6">
        Inguard
      </Typography>
    </Box>
  );
};
