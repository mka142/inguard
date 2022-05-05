import { useState, useEffect } from "react";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";

import {
  BottomNavigation,
  BottomNavigationAction,
  SvgIcon,
  Box,
  Paper,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

export const bottomNavigationHeight = 56;

export const MatchToBottomNavigation = ({ children }) => {
  return (
    <div style={{ marginBottom: `${bottomNavigationHeight}px` }}>
      {children}
    </div>
  );
};

const MyBottomNavigation = () => {
  const [value, setValue] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const config = {
    0: "/",
    1: "/settings",
    //1: "/revents",
  };

  useEffect(() => {
    let _value = null;

    Object.keys(config).every((key) => {
      if (matchPath(config[key], location.pathname) !== null) {
        _value = parseInt(key);
        return false;
      }
      return true;
    });

    setValue(_value);
  }, [location]);

  return (
    <Box
      zIndex={1100}
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      height={bottomNavigationHeight}
    >
      <Paper elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            navigate(config[newValue]);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          {/*}
          <BottomNavigationAction
            disabled
            label="Recents"
            icon={<RestoreIcon />}
        />*/}
          <BottomNavigationAction
            label="Settings"
            icon={<SvgIcon component={SettingsIcon} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default MyBottomNavigation;
