import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Tooltip,
  Badge,
  Fade,
  ListItemButton,
  Paper,
  InputBase,
  alpha,
  Backdrop,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  EmojiEmotions,
  Person,
  Chat,
  Logout,
  CalendarToday,
  People,
  Psychology,
  DashboardCustomize,
  BarChart,
  Business,
  Settings,
  Note,
  ChevronLeft,
  AccountCircleOutlined,
  NotificationsOutlined,
  Search as SearchIcon,
  HelpOutlineOutlined,
  MenuOpen,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";
import { logoutUser } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import roles from "../../config/roles";

const Layout = ({ children }) => {
  const { isMobile, isTablet } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  }, [isSmallScreen]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    dispatch(logoutUser());
    navigate("/login");
  };

  const drawerWidth = 260;

  let menuItems = [];
  let dashboardPrefix = "/";

  const userName = user?.name || user?.username || t("user");
  let roleText = "";

  if (user && user.role) {
    switch (user.role.roleId) {
      case roles.PATIENT:
        roleText = t("patient");
        dashboardPrefix = "/patient-dashboard";
        menuItems = [
          {
            text: t("homePage"),
            icon: <Dashboard />,
            path: `${dashboardPrefix}`,
          },
          {
            text: t("moodJournal"),
            icon: <EmojiEmotions />,
            path: `${dashboardPrefix}/mood-journal`,
          },
          {
            text: t("therapyChat"),
            icon: <Chat />,
            path: `${dashboardPrefix}/therapy-chat`,
          },
          {
            text: t("appointments"),
            icon: <CalendarToday />,
            path: `${dashboardPrefix}/appointments`,
          },
          {
            text: t("profile"),
            icon: <Person />,
            path: `${dashboardPrefix}/profile`,
          },
        ];
        break;
      case roles.PSYCHOLOGIST:
        roleText = t("psychologist");
        dashboardPrefix = "/psychologist-dashboard";
        menuItems = [
          {
            text: t("homePage"),
            icon: <Dashboard />,
            path: `${dashboardPrefix}`,
          },
          {
            text: t("patients"),
            icon: <People />,
            path: `${dashboardPrefix}/patients`,
          },
          {
            text: t("appointments"),
            icon: <CalendarToday />,
            path: `${dashboardPrefix}/appointments`,
          },
          {
            text: t("patientNotes"),
            icon: <Note />,
            path: `${dashboardPrefix}/patient-notes`,
          },
          {
            text: t("profile"),
            icon: <Person />,
            path: `${dashboardPrefix}/profile`,
          },
        ];
        break;
      case roles.INSTITUTION:
        roleText = t("institution");
        dashboardPrefix = "/institution-dashboard";
        menuItems = [
          {
            text: t("homePage"),
            icon: <Dashboard />,
            path: `${dashboardPrefix}`,
          },
          {
            text: t("psychologists"),
            icon: <Psychology />,
            path: `${dashboardPrefix}/psychologists`,
          },
          {
            text: t("patients"),
            icon: <People />,
            path: `${dashboardPrefix}/patients`,
          },
          {
            text: t("appointments"),
            icon: <CalendarToday />,
            path: `${dashboardPrefix}/appointments`,
          },
          {
            text: t("analytics"),
            icon: <BarChart />,
            path: `${dashboardPrefix}/analytics`,
          },
          {
            text: t("profile"),
            icon: <Business />,
            path: `${dashboardPrefix}/profile`,
          },
        ];
        break;
      case roles.ADMIN:
        roleText = t("admin");
        dashboardPrefix = "/admin-dashboard";
        menuItems = [
          {
            text: t("homePage"),
            icon: <DashboardCustomize />,
            path: `${dashboardPrefix}`,
          },
          {
            text: t("users"),
            icon: <People />,
            path: `${dashboardPrefix}/users`,
          },
          {
            text: t("institutions"),
            icon: <Business />,
            path: `${dashboardPrefix}/institutions`,
          },
          {
            text: t("settings"),
            icon: <Settings />,
            path: `${dashboardPrefix}/settings`,
          },
          {
            text: t("profile"),
            icon: <Person />,
            path: `${dashboardPrefix}/profile`,
          },
        ];
        break;
      default:
        menuItems = [{ text: t("homePage"), icon: <Dashboard />, path: "/" }];
    }
  } else {
    menuItems = [
      { text: t("homePage"), icon: <Dashboard />, path: "/" },
      { text: t("profile"), icon: <Person />, path: "/profile" },
    ];
  }

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem ? currentItem.text : t("digitalTherapyAssistant");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={drawerOpen}
        onClick={handleDrawerToggle}
      />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${drawerOpen ? drawerWidth : 0}px` },
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: "white",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="600" component="div">
              {getCurrentPageTitle()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* SEARCH */}
            {/* <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: searchFocused ? 240 : 180,
                height: 40,
                mr: 2,
                transition: "all 0.3s ease",
                border: "1px solid",
                borderColor: searchFocused ? "primary.main" : "divider",
                boxShadow: searchFocused
                  ? "0 0 0 2px rgba(25, 118, 210, 0.2)"
                  : "none",
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                display: { xs: "none", md: "flex" },
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={t("search")}
                inputProps={{ "aria-label": t("search") }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </Paper> */}

            <Tooltip title={t("notifications")}>
              <IconButton
                color="inherit"
                onClick={handleNotificationMenuOpen}
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsOutlined />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={t("help")}>
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}
              >
                <HelpOutlineOutlined />
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 2,
                p: "4px 8px",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                src={user?.avatarUrl}
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                {userName?.substring(0, 1) || "U"}
              </Avatar>

              <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {userName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                >
                  {roleText}
                </Typography>
              </Box>

              <KeyboardArrowDown
                sx={{
                  fontSize: 18,
                  ml: 0.5,
                  color: "text.secondary",
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 2,
                minWidth: 180,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                mt: 1.5,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, display: { xs: "block", sm: "none" } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {roleText}
              </Typography>
            </Box>

            {isSmallScreen && (
              <Divider sx={{ display: { xs: "block", sm: "none" }, my: 1 }} />
            )}

            <MenuItem
              onClick={() => {
                handleProfileMenuClose();
                if (user?.role?.roleId === roles.PATIENT) {
                  navigate("/patient-dashboard/profile");
                } else if (user?.role?.roleId === roles.PSYCHOLOGIST) {
                  navigate("/psychologist-dashboard/profile");
                } else if (user?.role?.roleId === roles.INSTITUTION) {
                  navigate("/institution-dashboard/profile");
                } else if (user?.role?.roleId === roles.ADMIN) {
                  navigate("/admin-dashboard/profile");
                } else {
                  navigate("/profile");
                }
              }}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ListItemIcon>
                <AccountCircleOutlined
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={t("profile")}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                },
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "error.main" }} />
              </ListItemIcon>
              <ListItemText
                primary={t("logout")}
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: "error.main",
                }}
              />
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: 2,
                width: 320,
                maxHeight: 400,
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                mt: 1.5,
              },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {t("notifications")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t("youHave")} 3 {t("unreadNotifications")}
              </Typography>
            </Box>

            <MenuItem
              onClick={handleNotificationMenuClose}
              sx={{
                py: 1.5,
                borderLeft: "3px solid",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t("newAppointmentRequest")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  30 {t("minutesAgo")}
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem
              onClick={handleNotificationMenuClose}
              sx={{
                py: 1.5,
                borderLeft: "3px solid",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t("appointmentReminder")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t("tomorrow")} 10:00
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem
              onClick={handleNotificationMenuClose}
              sx={{
                py: 1.5,
                borderLeft: "3px solid",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t("newMessage")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t("yesterdayAt")} 18:30
                </Typography>
              </Box>
            </MenuItem>

            <Box
              sx={{
                p: 1.5,
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {t("viewAllNotifications")}
              </Typography>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            backgroundColor: "#f8f9fa",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              p: 2,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              color="primary"
              sx={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              }}
            >
              <DashboardCustomize sx={{ mr: 1 }} />
              {t("digitalTherapy")}
            </Typography>

            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeft />
            </IconButton>
          </Box>

          <Box
            sx={{
              mt: 2,
              px: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
            >
              {t("menu")}
            </Typography>
          </Box>

          <List sx={{ flexGrow: 1, px: 1, mt: 1 }}>
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;

              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                      setDrawerOpen(false);
                    }}
                    selected={isSelected}
                    sx={{
                      borderRadius: 2,
                      py: 1,
                      pl: 2,
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                      "&:hover": {
                        backgroundColor: isSelected
                          ? "primary.dark"
                          : alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isSelected ? "inherit" : "primary.main",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              display="block"
            >
              © 2025 {t("digitalTherapyAssistant")}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          pt: "64px",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
