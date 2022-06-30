import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase-config';
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [signUpFirstName, setSignUpFirstName] = React.useState("");
  const [signUpLastName, setSignUpLastName] = React.useState("");
  const [signUpYear, setSignUpYear] = React.useState("");
  const [signUpSemester, setSignUpSemester] = React.useState("");
  const [signUpMajor, setSignUpMajor] = React.useState("");
  const [signUpMinor, setSignUpMinor] = React.useState("");
  const [signUpOtherProgrammes, setSignUpOtherProgrammes] = React.useState("");
  const [signUpDisplayName, setSignUpDisplayName] = React.useState("");

  const goTo = useNavigate();
  const routeHome = () =>{ 
    let path = `/home`; 
    goTo(path);
  }

  const routeChange = () =>{ 
    let path = `/signin`; 
    goTo(path);
  }

  const signup = async (em, ps, userProfile) => {
    try{
      await createUserWithEmailAndPassword(auth, em, ps).then(user=> {
      const userRef = doc(db, "users-profile", user.user.uid);
      const plannerRef = doc(db, "users-planner", user.user.uid);
      setDoc(userRef, userProfile);
      const userData = {
        plannedMods: "",
        eligibleMods: ['CS1101S', 'MA1521', 'CS1231S'],
        warnings: [],
      }
      setDoc(plannerRef, userData);
    }).then(routeHome);
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const major = data.get('major');
    const minor = data.get('minor');
    const year = data.get('year');
    const semester = data.get('semester');
    const otherProgrammes = data.get('otherProgrammes');
    const displayName = data.get('displayName');

    const user = {
      email: email,
      password: password,
      displayName: displayName,
      firstName: firstName,
      lastName: lastName,
      major: major,
      minor: minor,
      year: year,
      semester: semester,
      otherProgrammes: otherProgrammes,
    }

    setSignUpEmail(email);
    setSignUpPassword(password);
    setSignUpFirstName(firstName);
    setSignUpLastName(lastName);
    setSignUpMajor(major);
    setSignUpMinor(minor);
    setSignUpYear(year);
    setSignUpSemester(semester);
    setSignUpOtherProgrammes(otherProgrammes);
    setSignUpDisplayName(displayName);
    signup(email, password, user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  name="displayName"
                  autoComplete="displayName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="year"
                  label="Year"
                  name="year"
                  autoComplete="year"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="semester"
                  label="Semester"
                  name="semester"
                  autoComplete="semester"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="major"
                  label="Major"
                  name="major"
                  autoComplete="major"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="minor"
                  label="Minor"
                  name="minor"
                  autoComplete="minor"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="otherProgrammes"
                  label="Other Programmes"
                  name="otherProgrammes"
                  autoComplete="otherProgrammes"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" 
                variant="body2"
                onClick={routeChange}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}