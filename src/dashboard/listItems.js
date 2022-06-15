import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BookIcon from '@mui/icons-material/Book';
import MessageIcon from '@mui/icons-material/Message';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { List } from '@mui/material';

export default function ListItems(){
  
  const goTo = useNavigate();
  
  const goToHome = () =>{
    let path = '/home';
    goTo(path);
  }

  const goToCalculator = () =>{ 
    let path = `/calculator`; 
    goTo(path);
  };

  const goToPlanner = () =>{ 
    let path = `/planner`; 
    goTo(path);
  };

  const goToSignOut = () =>{ 
    let path = `/signout`; 
    goTo(path);
  };
  
  return (
  <List>
    <ListItemButton onClick={goToHome}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={goToPlanner}>
      <ListItemIcon>
        <DesignServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Module Planner"/>
    </ListItemButton>
    <ListItemButton onClick={goToCalculator}>
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
    <ListItemButton>
      <ListItemIcon>
        <ManageAccountsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItemButton>
    <ListItemButton onClick={goToSignOut}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
    </List>
  );

}