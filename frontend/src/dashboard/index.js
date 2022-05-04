import { connect } from "react-redux";
import { setSearch, setAdd, setBack } from "./appBarSlice";
import { useNavigate } from "react-router-dom";

import AppBar from "../base/AppBar";
import BottomNavigation from "../base/BottomNavigation";

const Dashboard = ({ appBar, ...props }) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    props.setBack({ back: false });
    navigate(appBar.backLink);
  };

  return (
    <>
      <AppBar
        title={appBar.title}
        back={appBar.back}
        add={appBar.add}
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

export default connect(mapStateToProps, { setBack })(Dashboard);
