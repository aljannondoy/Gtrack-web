/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from '@mui/icons-material/Email';
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import MainListItems from "../components/ListItemComponent";
import { useState } from "react";
import ReportNotifications from "../components/ReportNotifications";
import { useEffect } from "react";
import Firebase from "../components/helpers/Firebase";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";

const database=Firebase.database();
const auth=Firebase.auth();
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={`${process.env.REACT_APP_FRONTEND_URL}`}>
        Gtrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const mdTheme = createTheme();
const PageLayout = ({headerTitle,children}) => {
  const [concerns, setConcerns] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [user, setUser] = useState(null);
  const getFirebaseConcerns = () => {
    database.ref(`Concerns/`).orderByKey().on('value', function (snapshot) {
        if(snapshot.val()){
            var snap=snapshot.val();
            var temp=[];
            // eslint-disable-next-line array-callback-return
            Object.keys(snap).map((key) => {
              if(snap[key].active===1){
                temp.push(snap[key]);
              }
            });
            temp=temp.reverse();
            setConcerns([...temp]);
        }else{
          setConcerns([]);
        }
    });
  }
  const getFirebaseReports = () => {
    database.ref(`Reports/`).orderByKey().on('value', function (snapshot) {
        if(snapshot.val()){
            var snap=snapshot.val();
            var temp=[];
            // eslint-disable-next-line array-callback-return
            Object.keys(snap).map((key) => {
              if(snap[key].active===1){
                temp.push(snap[key]);
              }
            });
            temp=temp.reverse();
            setAlerts([...temp]);
        }else{
          setAlerts([]);
        }
    });
  }
  const getCookiesJWT=()=>{
    const cookie=Cookies.get("user_id");
    if(cookie){
      const decodedToken = decodeToken(cookie);
      setUser(JSON.parse(decodedToken.user_id));
    }
  }
  useEffect(() => {
    getCookiesJWT();
    getFirebaseConcerns();
    getFirebaseReports();
    return()=>{
      setAlerts([]);
      setConcerns([]);
    }
  }, [])
  
  const [type, setType] = useState(null);
  const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);
  const openNotification = Boolean(anchorNotificationEl);
  const handleNotificationClick = (event,notifType) => {
    setType(notifType);
    setAnchorNotificationEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorNotificationEl(null);
  };
  const [placeholder, setPlaceholder] = useState(true);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = async (event) => {
    if(auth.currentUser){
      await auth.signOut();
    }
    Cookies.remove('user_id');
    navigate("/login");
  };
  const settings = [
    { setting: 'Dashboard', route: '/dashboard' },
    { setting: 'Generate Report', route: '/dashboard' },
    { setting: 'Garbage Chart', route: '/dashboard' },
    { setting: 'Collection', route: '/dashboard' },
    { setting: 'Track Collection', route: '/track' },
    { setting: 'Announcements', route: '/announcements' },
    { setting: 'Events', route: '/events' },
    { setting: 'Schedules', route: '/schedules' },
    { setting: 'Truck Assignment', route: '/schedules' },
    { setting: 'Calendar', route: '/schedules' },
    { setting: 'Employees', route: '/employees' },
    { setting: 'Drivers', route: '/employees' },
    { setting: 'Admins', route: '/employees' },
    { setting: 'Inactive Account', route: '/employees' },
    { setting: 'Garbage Trucks', route: '/trucks' },
    { setting: 'Dumpsters', route: '/dumpsters' },
    { setting: 'Reports', route: '/reports' },
    { setting: 'Concerns', route: '/reports' },
    { setting: 'Resolved Reports', route: '/reports' },
    { setting: 'Resolved Concerns', route: '/reports' },
    { setting: 'Account Settings', route: '/settings' },
    { setting: 'General Information', route: '/settings' },
    { setting: 'Change Address', route: '/settings' },
    { setting: 'Change Password', route: '/settings' },
    { setting: 'Update Name', route: '/settings' },
    { setting: 'Update Info', route: '/settings' },
  ]
  const handleChange=(event,value)=>{
    if(typeof value === 'object'){
      setPlaceholder(false);
      navigate(value.route);
    }else{
      setPlaceholder(true);
    }
  }
  const handleInputChange=(event)=>{
    if(event.target.value===""){
      setPlaceholder(true);
    }else{
      setPlaceholder(false);
    }
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="success">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              disableClearable
              options={settings}
              getOptionLabel={settings => settings.setting||""}
              onChange={handleChange}
              onInputChange={handleInputChange}
              renderInput={(params) => <TextField {...params} 
              size="small"
              sx={{
                borderRadius:1,
                backgroundColor: "white",
                display: { xs: 'none', sm: 'none', md: 'block' }
              }}
              InputLabelProps={{
                shrink:false
              }}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                style:{
                  width:200
                }
              }}
              label={placeholder?"Search":""}
              />}
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {headerTitle}
            </Typography>
            <IconButton
              color="inherit"
              onClick={(e)=>handleNotificationClick(e,"alert")}
            >
              <Badge badgeContent={alerts?alerts.length:0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton 
            onClick={(e)=>handleNotificationClick(e,"concern")}
            color="inherit">
              <Badge badgeContent={concerns?concerns.length:0} color="secondary">
                <EmailIcon/>
              </Badge>
            </IconButton>
            <ReportNotifications open={openNotification} reports={type==='concern'?concerns:alerts} type={type} anchorEl={anchorNotificationEl} handleClose={handleNotificationClose}/>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openDropDown ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openDropDown ? "true" : undefined}
              >
                {(user&&user.image!==null) && <Avatar sx={{ width: 32, height: 32 }} src={user&&user.image}></Avatar>}
                {(user&&user.image===null) && <Avatar sx={{ width: 32, height: 32,fontSize:15,textTransform:"uppercase"}}>{user&&user.fname[0]}{user&&user.lname[0]}</Avatar>}
              </IconButton>
            </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openDropDown}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={styles}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <a onClick={()=>navigate("/settings")} className="btn ext-decoration-none text-dark">
                  <i className="fa fa-cog" aria-hidden="true"></i>&nbsp;
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a onClick={handleLogout} className="btn text-decoration-none text-dark">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
                  Logout 
                  </a>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Link color="inherit" href="/">
                  <img
                    alt="GTrack Logo"
                    width={105}
                    height={45}
                    className="mb-2"
                    src="/images/gtrack-logo-1.png"
                  ></img>
                </Link>
              </Grid>
            </Grid>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          <List>
            <MainListItems />
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            // height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <>
              {children}
            </>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const styles = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};
export default PageLayout
