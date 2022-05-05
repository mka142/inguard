import { Box, Typography } from "@mui/material";

export default ({ name, value, props }) => {
  return (
    <Box display="flex" flexDirection="column" {...props}>
      <Typography variant="body2" color="text.secondary" component="span">
        {name}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};
