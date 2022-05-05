import { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  IconButton,
  Button,
  Collapse,
  Fade,
  FormControl,
  Input,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./AppBar.css";

export const appBarHeight = 56;

export default ({
  title,
  back = true,
  search = true,
  add = true,
  loading = false,
  info = false,
  edit = false,
  remove = false,
  onInfo = () => {},
  onSearch = () => {},
  onAdd = () => {},
  onGoBack = () => {},
  onEdit = () => {},
  onRemove = () => {},
}) => {
  const [searching, setSearching] = useState({ open: false, value: "" });
  const appBarRef = useRef(null);

  useEffect(() => {
    if (!search) {
      setSearching({ open: false, value: "" });
    }
  }, [search]);

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

  const _onEdit = () => {
    onEdit();
  };
  const _onRemove = () => {
    onRemove();
  };

  return (
    <>
      <Box position="sticky" top={0} zIndex={1100}>
        <AppBar position="static" color="inherit">
          <Toolbar
            sx={{ height: appBarHeight }}
            variant="dense"
            className={`${searching ? "searching" : ""}`}
          >
            {back ? (
              <IconButton color="primary" onClick={_onGoBack}>
                <ArrowBackIosIcon />
              </IconButton>
            ) : null}
            <Box flexGrow={2} display="flex" pr={1}>
              <Typography variant="h6" component="div" my="auto">
                {title}
              </Typography>
              {info ? (
                <IconButton onClick={onInfo}>
                  <InfoIcon />
                </IconButton>
              ) : null}
            </Box>
            {search ? (
              <IconButton size="large" onClick={onSearchToggle}>
                {searching.open ? <SearchOffIcon /> : <SearchIcon />}
              </IconButton>
            ) : null}
            {add ? (
              <IconButton size="large" onClick={_onAdd}>
                <AddCircleIcon />
              </IconButton>
            ) : null}
            {edit ? <Button onClick={_onEdit}>edit</Button> : null}
            {remove ? <Button onClick={_onRemove}>Delete</Button> : null}
          </Toolbar>
        </AppBar>
        <Box top={appBarHeight} position="absolute" width="100%">
          <Fade in={loading} timeout={{ exit: 2000 }}>
            <LinearProgress />
          </Fade>
        </Box>
      </Box>
      <Box
        square
        ref={appBarRef}
        zIndex={!searching.open ? 1 : 1000}
        /*position="sticky"
        top={appBarHeight}*/
      >
        <Collapse
          in={searching.open}
          direction="down"
          container={appBarRef.current}
        >
          <Box display="flex">
            <FormControl margin="dense" fullWidth sx={{ p: 2 }}>
              <Input
                placeholder="Search..."
                onChange={_onSearch}
                value={searching.value}
              />
            </FormControl>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};
