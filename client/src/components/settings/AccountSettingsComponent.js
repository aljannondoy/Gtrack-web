import React, { useEffect, useState } from "react";
import { Container,Box, Button, Paper, List, ListItem,ListItemButton, ListItemText,Grid,Divider,Typography,Tab,Tabs } from "@mui/material";
import General from "./textfields/General";
import PropTypes from 'prop-types';
import ChangePassword from "./textfields/ChangePassword";
import Address from "./textfields/Address";
import Info from "./textfields/Info";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        className="mx-auto"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const AccountSettingsComponent = ({user,setUser,statusToast, setStatusToast}) => {
    const [value, setValue] = React.useState(0);
    const [data,setData]=useState(null);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(()=>{
      setData(user)
    },[user]);

    return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',width:'100%', height: '100%',padding:'2rem',
    }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Change Password" {...a11yProps(1)} />
        <Tab label="Address" {...a11yProps(2)} />
        <Tab label="Info" {...a11yProps(3)} />
      </Tabs>
      <TabPanel sx={{width:'100%',height:'100%'}} value={value} index={0}>
        <General user={data} setUser={setUser} statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
      <TabPanel sx={{width:'100%',height:'100%'}}  value={value} index={1}>
        <ChangePassword user={user} setUser={setUser} statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
      <TabPanel  sx={{width:'100%',height:'100%'}} value={value} index={2}>
        <Address user={data} setUser={setUser} statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
      <TabPanel sx={{width:'100%',height:'100%'}}  value={value} index={3}>
        <Info user={data} setUser={setUser} statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
     
    </Box>

    );
   
}

export default AccountSettingsComponent;