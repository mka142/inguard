import { connect } from "react-redux";
import { setAppBar, setClear, setChange } from "./appBarSlice";
import { useNavigate } from "react-router-dom";

import AppBar from "../base/AppBar";
import BottomNavigation from "../base/BottomNavigation";

const Dashboard = ({ appBar, ...props }) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    props.setAppBar({ backClicked: !appBar.backClicked });
    props.setAppBar({ back: false });
    navigate(appBar.backLink);
  };

  const onInfo = () => {
    props.setAppBar({ infoClicked: !appBar.infoClicked });
  };

  const onAdd = () => {
    props.setChange("addClicked");
  };

  return (
    <>
      <AppBar
        info={appBar.info}
        onInfo={onInfo}
        title={appBar.title}
        back={appBar.back}
        add={appBar.add}
        onAdd={onAdd}
        search={appBar.search}
        loading={appBar.loading}
        onGoBack={onGoBack}
      />

      <BottomNavigation />
    </>
  );
};

const mapStateToProps = (state) => {
  return { appBar: state.appBar };
};

export default connect(mapStateToProps, { setClear, setChange, setAppBar })(
  Dashboard
);
