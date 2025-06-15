import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  Slide,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useTheme,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Logo from "./Logo";
import NotificationsPopover from "./NotificationsPopover";
import SearchDialog from "./SearchDialog";
// This component is now just a wrapper that doesn't hide the navbar
function HideOnScroll(props) {
  const { children } = props;

  // Simply return the children without the Slide animation
  return children;
}

const Navbar = ({ userRole = null }) => {
  const location = useLocation();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isTransparent, setIsTransparent] = useState(location.pathname === "/");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  // Navigation items based on user role
  const pages =
    userRole === "customer"
      ? [
          { title: "Home", path: "/", icon: <HomeIcon /> },
          {
            title: "Browse Fields",
            path: "/fields",
            icon: <SportsSoccerIcon />,
          },
          { title: "Offers", path: "/offers", icon: <LocalOfferIcon /> },
          {
            title: "My Bookings",
            path: "/my-bookings",
            icon: <BookOnlineIcon />,
          },
          { title: "About Us", path: "/about", icon: <InfoIcon /> },
          { title: "Contact", path: "/contact", icon: <ContactSupportIcon /> },
          { title: "Careers", path: "/careers", icon: <WorkIcon /> },
          { title: "Blog", path: "/blog", icon: <ArticleIcon /> },
        ]
      : [
          { title: "Home", path: "/", icon: <HomeIcon /> },
          {
            title: "Browse Fields",
            path: "/fields",
            icon: <SportsSoccerIcon />,
          },
          { title: "About Us", path: "/about", icon: <InfoIcon /> },
          { title: "Contact", path: "/contact", icon: <ContactSupportIcon /> },
          { title: "Careers", path: "/careers", icon: <WorkIcon /> },
          { title: "Blog", path: "/blog", icon: <ArticleIcon /> },
            { title: "Offers", path: "/offerspage", icon: <LocalOfferIcon /> },
        ];

  const settings = userRole
    ? [
        { title: "Profile", icon: <AccountCircleIcon />, action: "profile" },
        { title: "My Bookings", icon: <BookOnlineIcon />, action: "bookings" },
        { title: "Logout", icon: <LoginIcon />, action: "logout" },
      ]
    : [
        {
          title: "Login",
          icon: <LoginIcon />,
          action: "login",
          path: "/login",
        },
        {
          title: "Register",
          icon: <HowToRegIcon />,
          action: "register",
          path: "/register",
        },
      ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();

    // Handle navigation based on setting action
    switch (setting.action) {
      case "login":
        // Navigate to login is handled by Link component
        break;
      case "register":
        // Navigate to register is handled by Link component
        break;
      case "logout":
        // Navigate to logout page
        window.location.href = "/logout";
        break;
      case "profile":
        // Navigate to profile
        window.location.href = "/profile";
        break;
      case "bookings":
        // Navigate to bookings
        window.location.href = "/my-bookings";
        break;
      default:
        break;
    }
  };

  // Handle search dialog
  const handleOpenSearchDialog = () => {
    setSearchDialogOpen(true);
  };

  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false);
  };

  // Handle notifications popover
  const handleOpenNotifications = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationsAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        const scrollPosition = window.scrollY;
        // Always keep the navbar visible, but change its appearance based on scroll position
        setIsTransparent(scrollPosition < 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Update transparency when location changes
  useEffect(() => {
    setIsTransparent(location.pathname === "/");
  }, [location.pathname]);

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isTransparent ? "black" : "secondary.main",
          boxShadow: isTransparent ? "none" : 1,
          transition: "all 0.3s ease",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Desktop Logo */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              <Logo color="white" />
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open menu"
                onClick={toggleDrawer(true)}
                sx={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>

              {/* Mobile Drawer */}
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: 280,
                    bgcolor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Logo color="white" />
                  <IconButton color="inherit" onClick={toggleDrawer(false)}>
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
                <List sx={{ p: 1 }}>
                  {/* Subscribe Button for Mobile */}
                  <ListItem
                    button
                    component={Link}
                    to="/subscription"
                    onClick={toggleDrawer(false)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      bgcolor:
                        location.pathname === "/subscription"
                          ? "rgba(255,106,0,0.1)"
                          : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === "/subscription"
                            ? "primary.main"
                            : "white",
                        minWidth: 40,
                      }}
                    >
                      <SubscriptionsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Subscribe"
                      sx={{
                        "& .MuiListItemText-primary": {
                          color:
                            location.pathname === "/subscription"
                              ? "primary.main"
                              : "white",
                          fontWeight:
                            location.pathname === "/subscription" ? 600 : 400,
                        },
                      }}
                    />
                  </ListItem>

                  {pages.map((page) => (
                    <ListItem
                      button
                      key={page.title}
                      component={Link}
                      to={page.path}
                      onClick={toggleDrawer(false)}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        bgcolor:
                          location.pathname === page.path
                            ? "rgba(255,106,0,0.1)"
                            : "transparent",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            location.pathname === page.path
                              ? "primary.main"
                              : "white",
                          minWidth: 40,
                        }}
                      >
                        {page.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={page.title}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color:
                              location.pathname === page.path
                                ? "primary.main"
                                : "white",
                            fontWeight:
                              location.pathname === page.path ? 600 : 400,
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />
                <Box sx={{ p: 2 }}>
                  {!userRole && (
                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/subscription"
                        startIcon={<SubscriptionsIcon />}
                        onClick={toggleDrawer(false)}
                      >
                        Subscribe
                      </Button>
                      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
                      <Typography
                        variant="subtitle2"
                        color="white"
                        sx={{ px: 1, opacity: 0.7 }}
                      >
                        Account & Settings
                      </Typography>
                      <ListItem
                        button
                        component={Link}
                        to="/login"
                        onClick={toggleDrawer(false)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/register"
                        onClick={toggleDrawer(false)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                          <HowToRegIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                      </ListItem>
                    </Stack>
                  )}
                </Box>
              </Drawer>
            </Box>

            {/* Mobile Logo */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
              }}
            >
              <Logo color="white" withText={false} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                SportSpace
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  startIcon={page.icon}
                  sx={{
                    mx: 0.5,
                    my: 2,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: 1,
                    px: 1.5,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: location.pathname === page.path ? "100%" : "0%",
                      height: "2px",
                      bottom: "6px",
                      left: "0",
                      backgroundColor: "primary.main",
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    ...(location.pathname === page.path && {
                      backgroundColor: "rgba(255, 106, 0, 0.1)",
                    }),
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* Search Button */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                alignItems: "center",
              }}
            >
              <Tooltip title="Search">
                <IconButton
                  onClick={() => setSearchDialogOpen(true)}
                  sx={{ color: "white", mr: 1 }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              {userRole && (
                <Tooltip title="Notifications">
                  <IconButton
                    sx={{
                      mr: 1,
                      color: "white",
                    }}
                    onClick={handleOpenNotifications}
                  >
                    <Badge badgeContent={3} color="primary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {/* Search Dialog */}
            <SearchDialog
              open={searchDialogOpen}
              onClose={handleCloseSearchDialog}
            />

            {/* Notifications Popover */}
            <NotificationsPopover
              anchorEl={notificationsAnchorEl}
              open={Boolean(notificationsAnchorEl)}
              onClose={handleCloseNotifications}
            />

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              {userRole ? (
                <>
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>US</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      "& .MuiPaper-root": {
                        width: 280,
                        borderRadius: 2,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Account Settings
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Manage your profile and settings
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={() => handleSettingClick(setting)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          "&:hover": {
                            bgcolor: "rgba(255, 106, 0, 0.05)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{ color: "primary.main", minWidth: 40 }}
                        >
                          {setting.icon}
                        </ListItemIcon>
                        <Typography sx={{ fontWeight: 500 }}>
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Button
                    component={Link}
                    to="/subscription"
                    variant="contained"
                    color="primary"
                    startIcon={<SubscriptionsIcon />}
                    sx={{ mr: 1 }}
                  >
                    Subscribe
                  </Button>
                  <Tooltip title="Settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 1, color: "white" }}
                    >
                      <AccountCircleIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      "& .MuiPaper-root": {
                        width: 280,
                        borderRadius: 2,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Account & Settings
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Login or register to access all features
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleCloseUserMenu}
                      sx={{
                        py: 1.5,
                        px: 2,
                        "&:hover": {
                          bgcolor: "rgba(255, 106, 0, 0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: "primary.main", minWidth: 40 }}
                      >
                        <LoginIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: 500 }}>Login</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/register"
                      onClick={handleCloseUserMenu}
                      sx={{
                        py: 1.5,
                        px: 2,
                        "&:hover": {
                          bgcolor: "rgba(255, 106, 0, 0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: "primary.main", minWidth: 40 }}
                      >
                        <HowToRegIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: 500 }}>Register</Typography>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      component={Link}
                      to="/about"
                      onClick={handleCloseUserMenu}
                      sx={{
                        py: 1.5,
                        px: 2,
                        "&:hover": {
                          bgcolor: "rgba(255, 106, 0, 0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: "primary.main", minWidth: 40 }}
                      >
                        <InfoIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: 500 }}>About Us</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/contact"
                      onClick={handleCloseUserMenu}
                      sx={{
                        py: 1.5,
                        px: 2,
                        "&:hover": {
                          bgcolor: "rgba(255, 106, 0, 0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: "primary.main", minWidth: 40 }}
                      >
                        <ContactSupportIcon />
                      </ListItemIcon>
                      <Typography sx={{ fontWeight: 500 }}>Contact</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
