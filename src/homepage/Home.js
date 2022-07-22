import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { auth } from '../authentication/firebase-config';
import Buttons from './Buttons';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { db } from '../authentication/firebase-config';
import { Box } from '@mui/material';
import {
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import '@firebase/firestore';

function UserInfoList(props) {
  const { userInfo, setUserInfo } = props;
  const [Y1S1Planned, setY1S1Planned] = useState([]);
  const [Y1S1Confirmed, setY1S1Confirmed] = useState("");
  const [Y1S1CAP, setY1S1CAP] = useState("");

  setY1S1Planned(userInfo.Y1S1Planned);

  function handleUserInfoCompletionToggled(toToggleWarning, toToggleWarningIndex) {
    const newUserInfo = [
      ...userInfo.slice(0, toToggleWarningIndex),
      {
        code: toToggleWarning.code,
        isComplete: !toToggleWarning.isComplete
      },
      ...userInfo.slice(toToggleWarningIndex + 1)
    ];
    setUserInfo(newUserInfo);

  }

  function YSdata(userInfo) {
    if(userInfo.Y1S1Planned !== null || userInfo.Y1S1Confirmed !== null || userInfo.Y1S1CAP !== null){
      setY1S1Confirmed(userInfo.Y1S1Confirmed);
      setY1S1Planned(userInfo.Y1S1Planned);
      setY1S1CAP(userInfo.Y1S1CAP);

    }
  }

  return (
    <>
        <box>
        <table style={{ margin: "0 auto", width: "100%" }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Y1S1 Confirmed</th>
                  <th>Y1S1 Planned</th>
                  <th> Y1S1 CAP</th>
                  <th>completed</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.map((info, index) => (
                  <tr key={info.Y1S1Confirmed}>
                    <td>{index + 1}</td>
                    <td>{info.Y1S1Confirmed}</td>
                    <td>{Y1S1Planned}</td>
                    <td>{info.Y1S1CAP}</td> 
                    <td>
                      <input
                        type="checkbox"
                        checked={info.isComplete}
                        onChange={() => handleUserInfoCompletionToggled(info, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </box>
  
    </>
  );
}


export default function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [otherProgrammes, setOtherProgrammes] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [Y1S1Planned, setY1S1Planned] = useState("");
  const [Y1S1Confirmed, setY1S1Confirmed] = useState("");
  const [Y1S1CAP, setY1S1CAP] = useState("");

  const [userInfo, setUserInfo] = useState([]);

  function YSdata(userInfo) {
    if(userInfo.Y1S1Planned !== null || userInfo.Y1S1Confirmed !== null || userInfo.Y1S1CAP !== null){
      setY1S1Confirmed(userInfo.Y1S1Confirmed);
      setY1S1Planned(userInfo.Y1S1Planned);
      setY1S1CAP(userInfo.Y1S1CAP);

    }
  }

  function getInfo(){
    if(firebase.auth().currentUser){

      const user = onSnapshot(doc(db, "users", firebase.auth().currentUser.uid), 
      (doc) => {
        //console.log(doc.data());
        setUserInfo(doc.data());
        });
        return user;
      } else {
       console.log("no info");
      }
  }

  React.useEffect(()=>{getInfo()}, []);
  const user = firebase.auth().currentUser;


    const currUser = () => {
            let user = auth.currentUser;
               return (
                   <p> I'm the current user: {user.email} </p>
               );
    }

  return (
    <>
    <Box>
            {userInfo.length > 0 ? (
                <UserInfoList userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
                <p>No modules taken</p>
            )}
    </Box>


    <Card sx={{ maxWidth: 3450,  margin: 25 }}>
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div" value = {userInfo.displayName}>
          {currUser}
          I'm the current user: {userInfo.firstName}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" value = {userInfo.displayName}>
          current mods: {userInfo.Y1S1Planned}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         user details are as follows:
         last name: {userInfo.lastName}

         major: {userInfo.major}
         
         minor: {userInfo.minor}
         
         semester: {userInfo.semester}
         
         otherProgrammes: {userInfo.otherprogrammes}

         year: {userInfo.year}

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" fullWidth>Relive The Journey!</Button>
      </CardActions>
    </Card>
    <>
    <Buttons/>
    </>
    </>
  );
}