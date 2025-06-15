import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsIcon from "@mui/icons-material/Sports";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "./Logo";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Fields", icon: <SportsIcon />, path: "/dashboard/fields" },
  { text: "Bookings", icon: <BookOnlineIcon />, path: "/dashboard/bookings" },
  {
    text: "Services",
    icon: <MiscellaneousServicesIcon />,
    path: "/dashboard/services",
  },
  { text: "Offers", icon: <LocalOfferIcon />, path: "/dashboard/offers" },
  { text: "Reviews", icon: <StarIcon />, path: "/dashboard/reviews" },
];

const AdminSidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "secondary.main",
          color: "white",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          justifyContent: "space-between",
        }}
      >
        <Logo color="white" />
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                py: 1.5,
                borderLeft:
                  location.pathname === item.path
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                bgcolor:
                  location.pathname === item.path
                    ? "rgba(255, 106, 0, 0.1)"
                    : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : "rgba(255, 255, 255, 0.7)",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    color:
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : "white",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mt: "auto" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              py: 1.5,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{ color: "rgba(255, 255, 255, 0.7)", minWidth: 40 }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
