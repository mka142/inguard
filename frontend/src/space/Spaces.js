import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchSpaces, setSelected as setSelectedSpace } from "./spaceSlice";
import { setAppBar } from "../dashboard/appBarSlice";

import { Card, Stack } from "../base";

import PullToRefresh from "../base/PullToRefresh";

const Spaces = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.setSelectedSpace(null);
    props.setAppBar({ back: false, title: "Spaces", add: false });
    if (!props.space.space.length) {
      props.fetchSpaces();
    }
  }, []);

  useEffect(() => {
    props.setAppBar({ loading: props.space.isLoading });
  }, [props.space.isLoading]);

  const spaceOnClick = (uuid) => {
    props.setAppBar({ back: true, backLink: "/", info: false });
    navigate(`/space/${uuid}`);
  };

  return (
    <>
      <PullToRefresh onPull={props.fetchSpaces}>
        <Stack>
          {!props.space.space.length && props.space.isLoading ? (
            <>
              <Card loading />
              <Card loading />
              <Card loading />
            </>
          ) : (
            <>
              {props.space.space.map((space) => (
                <Card
                  key={space.uuid}
                  title={space.name}
                  description={space.description}
                  image={space.image}
                  onClick={() => spaceOnClick(space.uuid)}
                />
              ))}
            </>
          )}
        </Stack>
      </PullToRefresh>
    </>
  );
};
const mapStateToProps = (state) => {
  return { space: state.space };
};
export default connect(mapStateToProps, {
  fetchSpaces,
  setAppBar,
  setSelectedSpace,
})(Spaces);
