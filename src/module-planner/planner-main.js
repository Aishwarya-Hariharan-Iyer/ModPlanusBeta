import React from "react";
import { useState } from "react";
import Box from "./Components/Box/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '@mui/material/Input';
import { InputAdornment } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function Planner() {
  const [addGradeText, setAddGradeText] = useState("");
  const [modList, setModList] = useState([]);
  const [Module, setModule] = useState([]);
  const [addModuleText, setAddModuleText] = useState("");

  function handleAddModule(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addModule(addModuleText, addGradeText);
  }

  function addModule(description, desc) {
    const newModule = [
      ...Module,
      {
        desc: desc,
        description: description,
        isComplete: false
      }
    ];
    const newModList = [
      ...modList,
      {
        description: description,
      }
    ];
    setModule(newModule);
    console.log(newModule);
    setModList(newModList);
    console.log(newModList);
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Plan your modules!
            </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <h2>Add Data</h2>
            <form onSubmit={handleAddModule}>
              Module Name
              <label>
                <Input
                  style={{ margin: "0 1rem" }}
                  type="text"
                  value={addModuleText}
                  onChange={(event) => {
                    setAddModuleText(event.target.value);
                  }}
                />
              </label>
            </form>
            <p> </p>
            <form onSubmit={handleAddModule}>
              Input Grade
              <label>
                <Input
                  style={{ margin: "0 1rem" }}
                  type="text"
                  value={addGradeText}
                  onChange={(event) => {
                    setAddGradeText(event.target.value);
                  }}
                />
              </label>
              <p> </p>
              <Button variant="contained">
                <Input type="submit" value="Add" />
              </Button>
            </form>
            <p> </p>
          </Box>

          <Box>
            <h2>List of modules</h2>
            <table style={{ margin: "0 auto", width: "100%" }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Modules</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {Module.map((Mod, idx) => (
                  <tr key={Mod.description}>
                    <td>{idx + 1}</td>
                    <td>{Mod.description}</td>
                    <td>{Mod.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          <p> </p>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
} 