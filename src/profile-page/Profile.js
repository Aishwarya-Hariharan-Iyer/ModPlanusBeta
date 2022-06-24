import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { db } from '../authentication/firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export default function Profile() { 


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [otherProgrammes, setOtherProgrammes] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');


  const database = firebase.database();

  const handleSubmit = (e) => {
    //console.log(user?.email);
    e.preventDefault();
    // const users = firebase.database().ref('User');
   // const currUserEmail = firebase.auth().currentUser.email;
    
   const email = firebase.auth().currentUser.email.split('@')[0];
   console.log(email);

    //users.push(user);
    updateUser(firebase.auth().currentUser.uid, firstName);
  };

  const updateUser = async (id, name) => {
    const userDoc = doc(db, "users-profile", id);
    await updateDoc(userDoc, {firstName: name});
  };

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        My Profile
      </Typography>

<p></p>

      <Typography variant="p" gutterBottom>
      Your Display Name is how you shall appear to others. Please enter your year of study for the current/upcoming academic year in the format 'YEAR X'
        (e.g. YEAR 1, YEAR 2, etc.). Similarly, enter your Semester of study as 'SEMESTER 1' or 'SEMESTER 2'.
      </Typography>

<p></p>
      <Grid item xs={12} sm={6} m={5}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} m={5}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
          />
          </Grid>

          <Grid item xs={12} sm={6} m={5}>
          <TextField
            required
            id="displayName"
            name="displayName"
            label="Display name"
            fullWidth
            autoComplete="display-name"
            variant="outlined"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} m={5}>
          <TextField
            required
            id="year"
            name="year"
            label="Current Year"
            fullWidth
            autoComplete="year"
            variant="outlined"
            onChange={(e) => setYear(e.target.value)}
          />
          </Grid>
        <Grid item xs={12} sm={6} m={5}>
          <TextField
            required
            id="semester"
            name="semester"
            label="Semester"
            fullWidth
            variant="outlined"
            onChange={(e) => setSemester(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} m={5}>
          <TextField
            required
            id="major"
            name="major"
            label="Major"
            fullWidth
            autoComplete="major"
            variant="outlined"
            onChange={(e) => setMajor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} m={5}>
          <TextField
            id="minor"
            name="minor"
            label="Minor"
            fullWidth
            autoComplete="minor"
            variant="outlined"
            onChange={(e) => setMinor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} m={5}>
          <TextField
            id="other programmes"
            name="other programmes"
            label="Other Programmes"
            fullWidth
            autoComplete="other programmes"
            variant="outlined"
            onChange={(e) => setOtherProgrammes(e.target.value)}
          />
        </Grid>
        <p></p>
        <Grid item xs={12} m={5}>
        <Button variant="contained" 
        startIcon={<SaveIcon />} 
        sx ={{m: 4}}
        onClick={handleSubmit}
        >
        Save Changes
        </Button>
        <Button variant="outlined" 
        startIcon={<DeleteIcon />}
        sx ={{m: 4}}
        >
        Delete Account
        </Button>
        </Grid>
    </React.Fragment>
  );
}