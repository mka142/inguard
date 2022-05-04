import PullToRefresh from "react-simple-pull-to-refresh";
import "./PullToRefresh.css";

export default ({ children, onPull = () => {} }) => {
  const _onPull = async () => {
    onPull();
    return true;
  };

  return (
    <PullToRefresh
      className="pullToRefresh"
      pullingContent=""
      onRefresh={_onPull}
      refreshingContent={""}
    >
      {children}
    </PullToRefresh>
  );
};
