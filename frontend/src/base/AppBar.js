import { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Slide,
  Fade,
  FormControl,
  Input,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "./AppBar.css";

export default ({
  title,
  back = true,
  search = true,
  add = true,
  loading = false,
  onSearch = () => {},
  onAdd = () => {},
  onGoBack = () => {},
}) => {
  const [searching, setSearching] = useState({ open: false, value: "" });

  useEffect(() => {
    onSearch(searching.value);
  }, [searching.value]);

  const onSearchToggle = () => {
    const value = searching.open ? "" : searching.value;

    setSearching({ open: !searching.open, value });
  };
  const _onGoBack = () => {
    onGoBack();
  };

  const _onSearch = (e) => {
    setSearching({ open: true, value: e.target.value });
  };

  const _onAdd = () => {
    onAdd();
  };

  return (
    <Box position="sticky" top={0} zIndex={1100}>
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense" className={`${searching ? "searching" : ""}`}>
          {back ? (
            <IconButton color="primary" onClick={_onGoBack}>
              <ArrowBackIosIcon />
            </IconButton>
          ) : null}

          <Typography variant="h6" component="div" pr={1} className="title">
            {title}
          </Typography>
          {search ? (
            <Box display="flex">
              <Slide in={searching.open}>
                <FormControl margin="dense">
                  <Input
                    placeholder="Search..."
                    onChange={_onSearch}
                    value={searching.value}
                  />
                </FormControl>
              </Slide>

              <IconButton size="large" onClick={onSearchToggle}>
                <SearchIcon />
              </IconButton>
            </Box>
          ) : null}

          {add ? (
            <IconButton size="large" onClick={_onAdd}>
              <AddCircleIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Fade in={loading} timeout={{ exit: 2000 }}>
        <LinearProgress />
      </Fade>
    </Box>
  );
};
