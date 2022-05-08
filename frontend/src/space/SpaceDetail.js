import { useEffect } from "react";
import { connect } from "react-redux";
import { setAppBar } from "../dashboard/appBarSlice";

import { DetailBox, Img, SimpleMap, Link } from "../base";
import { Box } from "@mui/material";

const SpaceDetail = ({ space, ...props }) => {
  useEffect(() => {
    if (!space) return;
    props.setAppBar({
      search: false,
      add: false,
      title: space.name,
      back: true,
      backLink: `/space/${space.uuid}`,
      info: false,
      remove: false,
    });
  }, [space]);

  if (!space || !props.places) return null;

  return (
    <>
      <Box display="flex" p={2} flexDirection="column">
        <Box>
          <Img width={"100%"} src={space.image} />
        </Box>
        <DetailBox name="Name" value={space.name} />
        <DetailBox
          name="Places"
          value={props.places.map((e) => (
            <span key={e.uuid}>
              <Link to={`../place/${e.uuid}/detail`}>{e.name}</Link>
              {","}
            </span>
          ))}
        />
        <DetailBox name="Description" value={space.description} />

        <Box width="100%" height="auto">
          <SimpleMap position={space.location} title={space.name} />
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  const space = state.space.space.find((e) => e.uuid === state.space.selected);
  const places = state.place.place.filter(
    (e) => e.space === state.space.selected
  );
  return {
    space,
    places,
  };
};
export default connect(mapStateToProps, { setAppBar })(SpaceDetail);
