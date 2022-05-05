import { connect } from "react-redux";
import { setAppBar, setClear, setChange } from "./appBarSlice";
import { useNavigate } from "react-router-dom";

import AppBar from "../base/AppBar";
import BottomNavigation from "../base/BottomNavigation";

const Dashboard = ({ appBar, ...props }) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    props.setChange("backClicked");
    //props.setAppBar({ backClicked: !appBar.backClicked });
    props.setAppBar({ back: false });
    navigate(appBar.backLink);
  };

  const onInfo = () => {
    props.setAppBar({ infoClicked: !appBar.infoClicked });
  };

  const onAdd = () => {
    props.setChange("addClicked");
  };
  const onEdit = () => {
    props.setChange("editClicked");
  };
  const onRemove = () => {
    props.setChange("removeClicked");
  };
  const onSearch = (query) => {
    props.setAppBar({ searchQuery: query });
  };

  return (
    <>
      <AppBar
        info={appBar.info}
        onInfo={onInfo}
        title={appBar.title}
        back={appBar.back}
        add={appBar.add}
        remove={appBar.remove}
        onAdd={onAdd}
        search={appBar.search}
        onSearch={onSearch}
        loading={appBar.loading}
        onGoBack={onGoBack}
        edit={appBar.edit}
        onEdit={onEdit}
        onRemove={onRemove}
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
