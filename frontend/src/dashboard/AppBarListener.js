import { useEffect, useState } from "react";

import { connect } from "react-redux";

import { setClear } from "./appBarSlice";

const AppBarListener = ({ appBar, on, onClick, ...props }) => {
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (first) {
      props.setClear(on);
      setFirst(false);
    } else {
      if (appBar[on] !== null) {
        onClick();
      }
    }
    // Your useEffect code here to be run on update
  }, [appBar[on]]);

  return null;
};

const mapStateToProps = (state) => {
  return { appBar: state.appBar };
};

export default connect(mapStateToProps, { setClear })(AppBarListener);
