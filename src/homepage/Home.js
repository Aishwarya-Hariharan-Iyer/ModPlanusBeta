import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { auth } from '../authentication/firebase-config';
import Buttons from './Buttons';

export default function Home() {


    const currUser = () => {
            let user = auth.currentUser;
               return (
                   <p> I'm the current user: {user.email} </p>
               );
    }

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currUser}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We hope to display all user details on this home page. This includes module credits earned so far, semester wise details and much more!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Relive The Journey!</Button>
      </CardActions>
    </Card>
    <>
    <Buttons/>
    </>
    </>
  );
}