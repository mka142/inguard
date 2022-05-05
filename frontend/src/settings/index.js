import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setAppBar } from "../dashboard/appBarSlice";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemAvatar,
} from "@mui/material";

import About from "./About";

export default connect(null, { setAppBar })((props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.setAppBar({
      back: false,
      title: "Settings",
      add: false,
      edit: false,
      search: false,
      remove: false,
      info: false,
    });
  }, []);

  const Option = ({ title, icon, to }) => (
    <ListItem button onClick={() => navigate(to)}>
      {icon ? <ListItemAvatar>{icon}</ListItemAvatar> : null}
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );

  return (
    <Routes>
      <Route
        path=""
        element={
          <List>
            <Option title="About" to="about" />
            <Divider />
            <Option title="Logout" to="/logout" />
          </List>
        }
      />
      <Route path="about" element={<About />} />
    </Routes>
  );
});
