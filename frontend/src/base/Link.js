import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default (props) => <MuiLink component={RouterLink} {...props} />;
