import React from "react";
import { useState } from "react";
import Box from "./Components/Box/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PlannerMain from './PlannerMain.css';
import Typography from '@mui/material/Typography';
import firebase from 'firebase/compat/app';
import { db } from "../authentication/firebase-config";
import {
  setDoc,
  doc,
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

  //string of module planned seperated by semicolon
  let modsPlanned = "";
  
  //set of eligible modules the student is allowed to take (all the preliminary modules are added here)
  //let eligibleMods = ['CS1101S', 'MA1521', 'CS1231S'];


  //the list of warnings to be displayed to user
  const [warnings, setWarnings] = React.useState([]);

  //a cariable to conduct trials with
  const [p, setP] = React.useState('');

  //the current user of the module
  const user = firebase.auth().currentUser;


//for when the page renders to help set the options for autocomplete
React.useEffect(
  () => {
      fetch(API_NUSMODS_URL)
      .then(res => res.json())
      .then(d => setData(d));

      //create user profile in firestore
      if(user){
      const userRef = doc(db, "users-planner", user.uid);
      const userData = {
        plannedMods: modsPlanned,
        warnings: warnings,
      }
      setDoc(userRef, userData);
    }
  },);

  
  React.useEffect(()=>{

    if(p){

    const code = p.moduleCode;
    setModCode(code);
    const res = new RegExp(/(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g);
    const mods = Module.map(x => x.code);

    const preclusions = p.preclusion;
    let precMods = [];
    
    if(preclusions){
      precMods = preclusions.match(res);
      setPreclusionMods(precMods);
    }

    const corequisites = p.corequisite;
    let coreqMods = [];
    
    if(corequisites){
      coreqMods = corequisites.match(res);
      setCorequisiteMods(coreqMods);
    }

    const fulfillReqs = p.fulfillRequirements;
    if(fulfillReqs){
      let newEligibleMods = [...eligibleMods, fulfillReqs]
      setEligibleMods(newEligibleMods);
    }
  
  }

  }, [p, Module, modsPlanned]);

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

React.useEffect(()=>{
  if(selected){
    completeAddition(modCode);
  }
}, [selected, containsCoreqs, containsPrecs, containsPrereqs])

function completeAddition(code){

  
  if(Module.map(x=>x.code).includes(code)){
    console.log(modCode);
    console.log(code);
    console.log("ERROR: CONTAINS THE MODULE ALREADY!");
  }
  if(!containsPrereqs){
    console.log("ERROR: UNFULFILLED PREREQS!");
    console.log(modCode);
    console.log(p.moduleCode);
    console.log(p.prerequisite);
  }
  if(!containsCoreqs){
    console.log("ERROR: UNFULFILLED COREQS!");
    console.log(modCode);
    console.log(code);
  }
  else{
    addToList(code);
  }
  setSelected(false);
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
    
    handleAddition(code);
    setSelected(true);
    completeAddition(code);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addModule(modCode);
  }

  return (
    
    <>
      <div className="Planner" style={PlannerMain.planner}>

        <h1>Plan your modules!</h1>

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
          </Box>
          <p> </p>
        </main>
      </div>
    </>
  );
} 
