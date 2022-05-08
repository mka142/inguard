import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editItem, setError } from "./itemSlice";
import { setAppBar } from "../dashboard/appBarSlice";
import AppBarListener from "../dashboard/AppBarListener";

import ItemForm from "./ItemForm";
import { parseErrors } from "./helpers";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ItemEdit = ({ item, ...props }) => {
  const navigate = useNavigate();

  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    if (item) {
      props.setAppBar({
        title: `Edit: ${item.name}`,
        back: true,
        backLink: `/space/${item.space}/item/${item.uuid}/detail`,
        search: false,
        edit: false,
        add: false,
        remove: true,
      });
    }
  }, [item]);

  useEffect(() => {
    props.setError(null);
    return () => props.setError(null);
  }, []);

  const onSubmit = async (_data) => {
    const data = { ..._data };
    if (data.image) {
      data.image = data.image[0];
    }
    data.tags = JSON.stringify(data.tags);

    const response = await props.editItem({
      uuid: item.uuid,
      formData: { ...data },
    });
    if (response.meta.requestStatus === "fulfilled") {
      navigate("../detail");
    }
  };
  const onDelete = async () => {};

  if (!item) {
    return null;
  }

  return (
    <>
      <AppBarListener
        on="removeClicked"
        onClick={() => setDeleteDialog(true)}
      />
      <Box p={2}>
        <ItemForm
          spaceUuid={item.space}
          image={item.image || "invalidImage"}
          initialValues={{
            name: item.name,
            description: item.description,
            place: item.place,
            tags: item.tags,
          }}
          loading={props.isLoading}
          onSubmit={onSubmit}
          _error={parseErrors(props.error)}
        />
      </Box>
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>{`Remove item: ${item.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible. If you are not sure move item to trash
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button onClick={onDelete}>Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  const item = state.item.items.find((e) => e.uuid === state.item.selected);
  return {
    item,
    isError: state.item.isError,
    isLoading: state.item.isLoading,
    error: state.item.error,
  };
};

export default connect(mapStateToProps, { editItem, setAppBar, setError })(
  ItemEdit
);
