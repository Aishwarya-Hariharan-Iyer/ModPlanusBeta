import React from "react";
import { useState } from "react";
import Box from "../module-planner/Components/Box/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';

const theme = createTheme();

export default function Calculator() {
  const [addGradeText, setAddGradeText] = useState("");
  const [Module, setModule] = useState([]);
  const [addMC, setAddMC] = useState(0);
  const [credits, setCredits] = useState(0);
  const [mc, setMC] = useState(0);
  const [addModuleText, setAddModuleText] = useState("");

  function handleAddModule(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addModule(addModuleText, addGradeText, addMC);
    console.log(addModuleText);
  }

  function addModule(description, desc, des) {
    const newModule = [
      ...Module,
      {
        des: des,
        desc: desc,
        description: description,
        isComplete: false
      }
    ];
    setMC(mc + des * 1);
    setCredits(credits + des * ComputeC(desc));
    const newNew = newModule.map((m) => m.description);
    setModule(newModule);
    //console.log(newModule);
    console.log(newNew);
    //setS(newNew);
  }

  function ComputeC(grade) {
    if (grade === "A+" || grade === "A") {
      return 5;
    }
    if (grade === "A-") {
      return 4.5;
    }
    if (grade === "B+") {
      return 4;
    }
    if (grade === "B") {
      return 3.5;
    }
    if (grade === "C+") {
      return 2.5;
    }
    if (grade === "C") {
      return 2;
    }
    if (grade === "D+") {
      return 1.5;
    }
    if (grade === "D") {
      return 1;
    }
    if (grade === "F") {
      return 0;
    }
  }

  function CAP(cred, mcs) {
    setCredits(credits + cred);
    setMC(mc + mcs);
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
              CAP calculator!
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}
>
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

                  }
                  }
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
            </form>
            <p> </p>
            <form onSubmit={handleAddModule}>
              Input MC
              <label>
                <Input
                  style={{ margin: "0 1rem" }}
                  type="text"
                  value={addMC}
                  onChange={(event) => {
                    setAddMC(event.target.value);
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
            <h2>Data of all modules</h2>
            <table style={{ margin: "0 auto", width: "100%" }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Modules</th>
                  <th>Grade</th>
                  <th>MC</th>
                  <th>MC*GP</th>
                </tr>
              </thead>
              <tbody>
                {Module.map((Mod, idx) => (
                  <tr key={Mod.description}>
                    <td>{idx + 1}</td>
                    <td>{Mod.description}</td>
                    <td>{Mod.desc}</td>
                    <td>{Mod.des}</td>
                    <td>{Mod.des * ComputeC(Mod.desc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>CAP is:</h4>
            <h4>{credits / mc}</h4>
          </Box>
          <p> </p>
            </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}