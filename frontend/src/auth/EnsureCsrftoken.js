import { useEffect, useState } from "react";

import csrftoken from "../api/csrftoken";

export default ({ children }) => {
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    const fetchtoken = async () => {
      const response = await csrftoken.set();
    };
    fetchtoken();
    return;
  }, []);
  return <>{children}</>;
};
