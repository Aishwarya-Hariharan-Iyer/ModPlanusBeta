import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


export default function Buttons() {
  let goTo = useNavigate(); 
  const goToPlanner = () =>{ 
    let path = `/planner`; 
    goTo(path);
  };
  const goToCalculator = () =>{ 
    let path = `/calculator`; 
    goTo(path);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={goToPlanner}>
      PLANNER
      </Button>
      <Button variant="contained" onClick={goToCalculator}>
      CALCULATE CAP
      </Button>
    </Stack>
  );
}