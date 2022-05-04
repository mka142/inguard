import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Typography, Box } from "@mui/material";

export default ({ title, description = null }) => {
  return (
    <Box display="flex" flexDirection="column" mx="auto" mt={5}>
      <SentimentDissatisfiedIcon
        sx={{ width: 100, height: 100, mx: "auto", color: "text.secondary" }}
      />
      <Typography mt={1} mx="auto" color="text.secondary">
        {title}
      </Typography>
    </Box>
  );
};
