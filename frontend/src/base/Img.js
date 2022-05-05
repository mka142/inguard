import { useState, useEffect } from "react";

export default (props) => {
  const [error, setError] = useState(!props.src);

  useEffect(() => {
    if (props.src) {
      setError(false);
    }
  }, [props.src]);

  if (!error) {
    return <img {...props} onError={(e) => setError(true)} />;
  }
  return <img {...props} src={process.env.PUBLIC_URL + "/image-holder.png"} />;
};
