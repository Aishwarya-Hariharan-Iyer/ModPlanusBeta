import * as React from 'react';
import { Button, Card, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { getAuth, updatePassword } from "firebase/auth";

export default function ForgotPassword(){
   
    const auth = getAuth();
    const user = auth.currentUser;
    const [newP, setNewP] = React.useState('');
    
   const updateP = (newPassword) => updatePassword(user, newPassword).then(() => {
  // Update successful.
  console.log("YAY! UPDATED!")
}).catch((error) => {
  // An error ocurred
  console.log("OOPS! ERROR" + error);
});

const handleSubmit = (e) => {
    e.preventDefault();
    updateP(newP);  
  };


return (
    <div>
        <Card>
        <Typography variant="h3">
            Forgot Password
            </Typography>
           <p></p>
           <TextField           
            id="newPassword"
            name="newPassword"
            placeholder="Enter Your New Password"
            fullWidth
            autoComplete="password"
            variant="outlined"
            onChange={(e) => setNewP(e.target.value)}
          />
          <p></p>
          <Button onClick = {handleSubmit}>
          SUBMIT
          </Button>

        </Card>


    </div>
);
}