import { connect } from "react-redux";
import { setAppBar } from "../dashboard/appBarSlice";

import { Switch, FormControlLabel, FormGroup } from "@mui/material";

const mapStateToProps = (state) => {
  return { theme: state.appBar.theme };
};

export default connect(mapStateToProps, { setAppBar })((props) => {
  const onChange = () => {
    const theme = props.theme === "dark" ? "light" : "dark";
    props.setAppBar({ theme });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch checked={props.theme === "dark"} onChange={onChange} />
        }
        label="Dark theme"
      />
    </FormGroup>
  );
});
