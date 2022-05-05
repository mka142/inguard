import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

export const MenuItem = (props) => {
  return (
    <ListItem button onClick={props.onClick}>
      {props.icon ? <ListItemAvatar>{props.icon}</ListItemAvatar> : null}
      <ListItemText>{props.children}</ListItemText>
    </ListItem>
  );
};

export default ({ title, open, children, onClose, ...props }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>{children}</List>
    </Dialog>
  );
};
