import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSelected, setItemQuantity } from "./itemSlice";

import { setAppBar } from "../dashboard/appBarSlice";

import { useNavigate } from "react-router-dom";

import { Box, Grid, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Img, FullAppContainer } from "../base";
import AppBarListener from "../dashboard/AppBarListener";

const Item = (props) => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const [quantity, setQuantity] = useState(null);
  const [debouncedQuantity, setDebouncedQuantity] = useState(null);

  //fetch data and set names to appBar
  useEffect(() => {
    const item = props.items.find((e) => e.uuid === props.selected);

    if (item) {
      setQuantity(item.quantity);
      setItem(item);
      props.setAppBar({
        back: true,
        backLink: `/space/${item.space}`,
        title: item.name,
        search: false,
        add: false,
        info: true,
        edit: false,
        remove: false,
      });
    }
  }, [props.selected, props.items]);

  useEffect(() => {
    props.setAppBar({ loading: props.isLoading });
  }, [props.isLoading]);

  useEffect(() => {
    if (props.isError) {
      navigate("/");
    }
  }, [props.isError]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuantity(quantity);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [quantity]);

  //change quantity
  useEffect(() => {
    if (item && debouncedQuantity !== item.quantity) {
      props.setItemQuantity({ uuid: item.uuid, quantity: debouncedQuantity });
    }
  }, [debouncedQuantity]);

  const onAddClick = () => {
    setQuantity(quantity + 1);
  };
  const onRemoveClick = () => {
    if (item.quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  if (!item) {
    return <></>;
  }

  const FlexBox = ({ children }) => {
    return (
      <Box display="flex" justifyContent="center" height="100%">
        {children}
      </Box>
    );
  };

  const SignButton = ({ Icon, color, ...props }) => (
    <Button
      sx={{ p: 2, mx: "auto" }}
      color={color}
      variant="contained"
      {...props}
    >
      <Icon sx={{ fontSize: 60 }} />
    </Button>
  );

  return (
    <>
      <AppBarListener on="infoClicked" onClick={() => navigate("detail")} />
      <FullAppContainer>
        <Box maxWidth="sm" fullWidth height="100%" mx="auto">
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12}>
              <Img width="100%" src={item.image} />
            </Grid>
            <Grid item xs={12}>
              <Grid container flexDirection="row">
                <Grid item xs={4}>
                  <FlexBox>
                    <SignButton
                      Icon={RemoveIcon}
                      color="error"
                      disabled={quantity === 0}
                      onClick={onRemoveClick}
                    />
                  </FlexBox>
                </Grid>
                <Grid item xs={4}>
                  <FlexBox>
                    <Typography sx={{ my: "auto" }} variant="h4">
                      {quantity}
                    </Typography>
                  </FlexBox>
                </Grid>
                <Grid item xs={4}>
                  <FlexBox>
                    <SignButton
                      Icon={AddIcon}
                      color="primary"
                      onClick={onAddClick}
                    />
                  </FlexBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FullAppContainer>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    items: state.item.items,
    isLoading: state.item.isLoading,
    isError: state.item.isError,
    space: state.space.space.find((e) => e.uuid === state.space.selected),
    selected: state.item.selected,
  };
};

export default connect(mapStateToProps, {
  setSelected,
  setAppBar,
  setItemQuantity,
})(Item);
