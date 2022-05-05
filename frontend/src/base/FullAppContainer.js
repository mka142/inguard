import { appBarHeight } from "./AppBar";
import { bottomNavigationHeight } from "./BottomNavigation";

import { Box } from "@mui/material";

export default ({ children }) => {
  return (
    <Box
      position="absolute"
      left={0}
      right={0}
      top={appBarHeight}
      bottom={bottomNavigationHeight}
    >
      <Box height="100%" maxHeight="100%" width="100%" position="relative">
        {children}
      </Box>
    </Box>
  );
};
