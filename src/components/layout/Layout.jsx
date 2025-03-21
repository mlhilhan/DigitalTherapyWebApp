import { useState } from "react";
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
  Container,
  Avatar,
  Menu,
  MenuItem,
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
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";
import { logoutUser } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

const Layout = ({ children }) => {
  const { isMobile, isTablet } = useResponsive();
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const ROLE_IDS = {
    PATIENT: "4b41d3bc-95cb-4758-8c01-c5487707931e",
    PSYCHOLOGIST: "40c2b39a-a133-4ba9-a97b-ce351bd101ac",
    ADMIN: "ce6c9f4d-8b26-4971-853a-69bafe48c012",
    INSTITUTION: "5e6ef66e-8298-4002-b765-5a794f149362",
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    dispatch(logoutUser());
    navigate("/login");
  };

  const drawerWidth = 240;

  let menuItems = [];
  let dashboardPrefix = "/";
  debugger;
  switch (user?.role?.roleId) {
    case ROLE_IDS.PATIENT:
      dashboardPrefix = "/patient-dashboard";
      menuItems = [
        {
          text: t("patient-dashboard"),
          icon: <Dashboard />,
          path: `${dashboardPrefix}/`,
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
    case ROLE_IDS.PSYCHOLOGIST:
      dashboardPrefix = "/psychologist-dashboard";
      menuItems = [
        {
          text: t("dashboard"),
          icon: <Dashboard />,
          path: `${dashboardPrefix}/`,
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
    case ROLE_IDS.INSTITUTION:
      dashboardPrefix = "/institution-dashboard";
      menuItems = [
        {
          text: t("dashboard"),
          icon: <Dashboard />,
          path: `${dashboardPrefix}/`,
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
    case ROLE_IDS.ADMIN:
      dashboardPrefix = "/admin-dashboard";
      menuItems = [
        {
          text: t("dashboard"),
          icon: <DashboardCustomize />,
          path: `${dashboardPrefix}/`,
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
      menuItems = [{ text: t("dashboard"), icon: <Dashboard />, path: "/" }];
  }

  // const menuItems = [
  //   { text: "Ana Sayfa", icon: <Dashboard />, path: "/dashboard" },
  //   {
  //     text: "Ruh Hali Günlüğü",
  //     icon: <EmojiEmotions />,
  //     path: "/mood-journal",
  //   },
  //   { text: "Terapi Asistanı", icon: <Chat />, path: "/therapy-assistant" },
  //   { text: "Profil", icon: <Person />, path: "/profile" },
  // ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" color="primary">
          Dijital Terapi
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${drawerOpen ? drawerWidth : 0}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dijital Terapi Asistanı
          </Typography>
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.username?.substring(0, 1) || "U"}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleProfileMenuClose();
                navigate("/profile");
              }}
            >
              Profil
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Çıkış Yap
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box> */}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <div>
            <Toolbar sx={{ justifyContent: "center" }}>
              <Typography variant="h6" color="primary">
                {t("digitalTherapy")}
              </Typography>
            </Toolbar>
            <Divider />
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
          },
          ml: { sm: `${drawerOpen ? drawerWidth : 0}px` },
          mt: "64px",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
