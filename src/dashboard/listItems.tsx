import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BookIcon from '@mui/icons-material/Book';
import MessageIcon from '@mui/icons-material/Message';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

function NavToPlanner(){
  const goTo = useNavigate(); 
  
  const goToPlanner = () =>{ 
    let path = `/planner`; 
    goTo(path);
  };
}

function NavToCalculator(){
  const goTo = useNavigate(); 
  
  const goToCalculator = () =>{ 
    let path = `/calculator`; 
    goTo(path);
  };
}

function NavToDashBoard(){
  const goTo = useNavigate(); 
  
  const goToDashboard = () =>{ 
    let path = `/dashboard`; 
    goTo(path);
  };
}

export const mainListItems = (

  <React.Fragment>
    <ListItemButton onClick={NavToDashBoard}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={NavToPlanner}>
      <ListItemIcon>
        <DesignServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Module Planner"/>
    </ListItemButton>
    <ListItemButton onClick={NavToCalculator}>
      <ListItemIcon>
        <CalculateIcon />
      </ListItemIcon>
      <ListItemText primary="CAP Calculator" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Module Information" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="ChatRoom" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ManageAccountsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  </React.Fragment>
);