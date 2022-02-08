import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  AppBar as AppBarMui,
  Box,
  Icon,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo192.png";

interface IProps {
  onRefresh?: () => void;
}

export const AppBar: FC<IProps> = ({ onRefresh }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position="static">
        <Toolbar>
          <Icon
            color="inherit"
            sx={{ mr: 2, flexGrow: 1, "text-align": "left" }}
          >
            <img alt="logo" src={logo} style={{ height: "inherit" }} />
          </Icon>
          <IconButton
            size="large"
            aria-label="about the app"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => navigate("/about")}
            color="inherit"
          >
            <HelpOutlineIcon />
          </IconButton>
          {onRefresh && (
            <IconButton
              size="large"
              aria-label="refresh valid reports"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onRefresh}
              color="inherit"
            >
              <RefreshIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBarMui>
    </Box>
  );
};
