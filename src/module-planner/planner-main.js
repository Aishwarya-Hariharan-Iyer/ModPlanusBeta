import React from "react";
import { useState } from "react";
import Box from "./Components/Box/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PlannerMain from './PlannerMain.css';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import firebase from 'firebase/compat/app';
import { db } from "../authentication/firebase-config";
import {
  setDoc,
  doc,
  onSnapshot, 
  updateDoc,
} from "firebase/firestore";



//NUSMODS API to retrieve the data for autocomplete from
const API_NUSMODS_URL = 'https://api.nusmods.com/v2/2021-2022/moduleList.json';

//NUSMODS API to retrieve the data for each module
const API_MODULE_INFO = 'https://api.nusmods.com/v2/2021-2022/modules/';

/**
 * function to render the planner page along with all of its components
 */
export default function Planner() {

  //the grade entered of planned module to be added
  const [gradePlanned, setGradePlanned] = useState('');
 
  //the module planned to be added
  const [Module, setModule] = useState([]);

  //module code of planned module to be added
  const [modCode, setModCode] = useState('');

  //data from the API set for Autocomplete information
  const [data, setData] = React.useState([]);

  //set preclusion, prerequsiites, corequisites and eligibleMods
  const [prerequisiteMods, setPrerequisiteMods] = React.useState([]);
  const [preclusionMods, setPreclusionMods] = React.useState([]);
  const [corequisiteMods, setCorequisiteMods] = React.useState([]);
  const [eligibleMods, setEligibleMods] = React.useState([]);

  //truth state of the completion
  const [containsCoreqs, setContainsCoreqs] = React.useState(true);
  const [containsPrereqs, setContainsPrereqs] = React.useState(true);
  const [containsPrecs, setContainsPrecs] = React.useState(false);

  //truth state of selection
  const [selected, setSelected] = React.useState(false);

   //the current user of the module
   const user = firebase.auth().currentUser;

  const [userInfo, setUserInfo] = useState([]);

  function getInfo(){
    if(firebase.auth().currentUser){

      const user = onSnapshot(doc(db, "users-planner", firebase.auth().currentUser.uid), 
      (doc) => {
        setUserInfo(doc.data());
        });
        return user;
      } else {
       console.log("no info");
      }
  }

  React.useEffect(()=>{getInfo()}, [userInfo]);

  const updateUser = async (id) => {
    const userDoc = doc(db, "users-planner", id);
    const userNew = {
      plannedMods: Module.map(x=>x.code),
      eligibleMods: eligibleMods,
      warnings: warnings,
    }
    await updateDoc(userDoc, userNew);
  };

  //string of module planned seperated by semicolon
  let modsPlanned = "";
  
  //set of eligible modules the student is allowed to take (all the preliminary modules are added here)
  //let eligibleMods = ['CS1101S', 'MA1521', 'CS1231S'];


  //the list of warnings to be displayed to user
  const [warnings, setWarnings] = React.useState([]);

  //a cariable to conduct trials with
  const [p, setP] = React.useState('');



//for when the page renders to help set the options for autocomplete
React.useEffect(
  () => {
      fetch(API_NUSMODS_URL)
      .then(res => res.json())
      .then(d => setData(d));
  },[data]);

  
  React.useEffect(()=>{

    if(p){

    const code = p.moduleCode;
    setModCode(code);
    const res = new RegExp(/(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g);
    const mods = Module.map(x => x.code);

    
    //preclusion condition to be matched
    const preclusions = p.preclusion;
    let precMods = [];
    
    if(preclusions){
      precMods = preclusions.match(res);
      setPreclusionMods(precMods);
      if(mods.some(element => {
        return precMods.includes(element);})){
        const msg = "PRECLUSIONS ERRORS: Did you finish this preclusions condition? " + preclusions;
        console.log(msg);
        const newWarnings = [...warnings, msg];
        setWarnings(newWarnings);
        //userInfo.warnings = newWarnings;
      }
    }



    //corequisite condition to be matched
    const corequisites = p.corequisite;
    let coreqMods = [];
    
    if(corequisites){
      coreqMods = corequisites.match(res);
      setCorequisiteMods(coreqMods);
      if(coreqMods.every(element => {
        return mods.includes(element);
      })){
        const msg = "COREQUISITE ERRORS: Did you finish this corequisite condition? " + corequisites;
        console.log(msg);
        const newWarnings = [...warnings, msg];
        setWarnings(newWarnings);
        //userInfo.warnings = newWarnings;
      }
    }

    //check if prerequisites are matched
    const prerequisites = p.prerequisite;
    if(prerequisites){
      if(!eligibleMods.includes(code)){
        const msg = "PREREQUISITE ERRORS: Did you finish this prerequisite condition? " + prerequisites;
        console.log(msg);
        const newWarnings = [...warnings, msg];
        setWarnings(newWarnings);
        //userInfo.warnings = newWarnings;
      }
  }
    
     const fulfillReqs = p.fulfillRequirements;
     if(fulfillReqs){
       let newEligibleMods = eligibleMods.concat(fulfillReqs);
       setEligibleMods(newEligibleMods);
       //userInfo.eligibleMods = eligibleMods;
     }

     //addToList(code); 
}
  
}, [p]);

// React.useEffect(()=>{
//   userInfo.eligibleMods = eligibleMods;
//   userInfo.plannedMods = Module.map(x=>x.code);
//   userInfo.warnings = warnings;
//   updateUser(user.uid);
// }, [warnings, eligibleMods, Module])

  React.useEffect(()=>{

    const code = modCode;
    const mods = Module.map(x => x.code);

    setContainsPrecs(
      mods.some(element => {
           return preclusionMods.includes(element);
      })
    );

    setContainsCoreqs(
      corequisiteMods.every(element => {
        return mods.includes(element);
      })
    );

    setContainsPrereqs(
      eligibleMods.includes(code)
    );


  }, [eligibleMods, corequisiteMods, preclusionMods])


//retrieve data regarding the module
function handleAddition(code){
   const response = fetch(`${API_MODULE_INFO}${code}.json`)
   .then(res => res.json())
   .then(res => setP(res)); 
}

function WarningList(props) {
  const { warnings, setWarnings } = props;

  function handleWarningCompletionToggled(toToggleWarning, toToggleWarningIndex) {
    const newWarnings = [
      ...warnings.slice(0, toToggleWarningIndex),
      {
        msg: toToggleWarning.msg,
        isComplete: !toToggleWarning.isComplete
      },
      ...warnings.slice(toToggleWarningIndex + 1)
    ];
    setWarnings(newWarnings);
  }
  return (
    <table style={{ margin: "0 auto", width: "100%" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Warning</th>
              <th>dismiss warnings</th>
            </tr>
          </thead>
          <tbody>
            {warnings.map((warns, index) => (
              <tr key={warns.msg}>
                <td>{index + 1}</td>
                <td>{warns.msg}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={warns.isComplete}
                    onChange={() => handleWarningCompletionToggled(warns, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  );
}

function addToList(code){
  const newModule = [
    ...Module,
    {
      code: code,

    }
  ];

  setModule(newModule);
}

<Typography>{warnings}</Typography>



  function addModule(code) {
    
    const mods = Module.map(x=>x.code);

    if(mods.includes(code)){
      console.log("You cannot add the same module twice! " + code);
    } else {
      handleAddition(code);
      addToList(code);
      console.log(eligibleMods);
      updateUser(user.uid);
    }
    setSelected(true);
    //completeAddition(code);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addModule(modCode);
  }

  return (
    
    <>
      <div className="Planner" style={PlannerMain.planner}>

        <h1>Plan your modules!</h1>

        <div>
            <h2>Warnings</h2>
            {warnings.length > 0 ? (
                <WarningList warnings={warnings} setWarnings={setWarnings} />
            ) : (
                <p>No warnings</p>
            )}
            </div>

        <main>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <h2>Add Data</h2>
      <Autocomplete
      disablePortal
      id="modules"
      name="modules"
      options={data}
      getOptionLabel = {(option) => option.moduleCode+" : "+option.title } 
      autoSelect = {true}
      renderInput={(params) => <TextField {...params} label={"Module Code"} />}
      onChange={(event, value) => { 
        if(value!==null){
          setModCode(value.moduleCode);
        }}
      }

/>
      <p></p>
      
    
      {/* <Autocomplete
      disablePortal
      id="grades"
      name="grades"
      options={[
        {l: 'A+'},
        {l: 'A'},
        {l: 'A-'},
        {l: 'B+'},
        {l: 'B'},
        {l: 'B-'},
        {l: 'C+'},
        {l: 'C'},
        {l: 'C-'},
        {l: 'D+'},
        {l: 'D'},
        {l: 'D-'},
        {l: 'F'},
        {l: 'S'},
        {l: 'U'},
      ]}
      getOptionLabel = {(option) => option.l} 
      autoSelect = {true}
      renderInput={(params) => <TextField {...params} label={"Predicted Grade"} />}
      onChange={(event, value) => {setGradePlanned(value.l);}}
      /> */}
    

      <p></p>
      <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Add Module
              </Button>
          </Box>

          <Box>
            <h2>List of modules</h2>
            <table style={{ margin: "0 auto", width: "100%" }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Modules</th>
                </tr>
              </thead>
              <tbody>
                {Module.map((Mod, idx) => (
                  <tr key={Mod.code}>
                    <td>{idx + 1}</td>
                    <td>{Mod.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p></p>


            <Grid item xs={12} m={5}>
            <Button variant="contained" 
            startIcon={<SaveIcon />} 
            sx ={{m: 4}}
            onClick={handleSubmit}
            >
            Save Changes
            </Button>
            </Grid>

          </Box>
          <p> </p>
        </main>
      </div>
    </>
  );
} 
