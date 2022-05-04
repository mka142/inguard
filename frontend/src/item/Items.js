import { useEffect } from "react";

import { connect } from "react-redux";
import { fetchItems } from "./itemSlice";
import { fetchPlaces } from "../space/placeSlice";
import { setAppBar } from "../dashboard/appBarSlice";

import { Stack, Card, Empty, PullToRefresh } from "../base";

import { useNavigate } from "react-router-dom";

const Items = (props) => {
  const navigate = useNavigate();
  

  const fetchData = () => {
    props.fetchItems({ space: props.space.selected });
    props.fetchPlaces({ space: props.space.selected });
  };

  const getItemPlace = (placeUUID) => {
    return Object(props.place.place.find((e) => e.uuid == placeUUID));
  };

  const selectedSpaceItems = () => {
    return props.item.items.filter((e) => e.space === props.space.selected);
  };
  const itemOnClick = (uuid) => {
    props.setAppBar({ back: true, backLink: "/" });
    navigate(`item/${uuid}`);
  };

  useEffect(() => {
    if (props.space.selected && !selectedSpaceItems().length) {
      fetchData();
    }
  }, [props.space.selected]);

  useEffect(() => {
    props.setAppBar({ loading: props.place.isLoading });
  }, [props.place.isLoading]);

  if (props.item.isLoading && selectedSpaceItems().length === 0) {
    return (
      <Stack>
        <Card loading />
        <Card loading />
        <Card loading />
      </Stack>
    );
  } else if (!props.item.isLoading && selectedSpaceItems().length === 0) {
    return <Empty title="No resources here yet" />;
  }

  return (
    <PullToRefresh onPull={fetchData}>
      <Stack>
        {selectedSpaceItems().map((item) => (
          <Card
            onClick={() => itemOnClick(item.uuid)}
            key={item.uuid}
            title={item.name}
            image={item.image}
            heading={getItemPlace(item.place).name}
            quantity={item.quantity}
          />
        ))}
      </Stack>
    </PullToRefresh>
  );
};

const mapStateToProps = (state) => {
  return { item: state.item, space: state.space, place: state.place };
};

export default connect(mapStateToProps, { fetchItems, fetchPlaces, setAppBar })(
  Items
);
