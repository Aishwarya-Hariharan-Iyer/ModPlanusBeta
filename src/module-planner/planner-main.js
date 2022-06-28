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



const API_NUSMODS_URL = 'https://api.nusmods.com/v2/2021-2022/moduleList.json';
const API_MODULE_INFO = 'https://api.nusmods.com/v2/2021-2022/modules/';


export default function Planner() {
  const [addGradeText, setAddGradeText] = useState('');
  const [Module, setModule] = useState([]);
  const [info, setInfo] = useState('');
  const [data, setData] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
  const [preclusions, setPreclusions] = React.useState("");
  const [corequisites, setCorequisites] = React.useState("");
  const [prerequisites, setPrerequsites] = React.useState([]);
  const [fulfillReqs, setFulfillReqs] = React.useState([]);
  let mods = "";
  let eligibleMods = ['CS1101S', 'MA1521', 'CS1231S'];
  const [warnings, setWarnings] = React.useState([]);
  let modName = "";
  let gradeName = "";


  const user = firebase.auth().currentUser;


React.useEffect(
  () => {
      fetch(API_MODULE_INFO)
      .then(res => res.json())
      .then(d => setData(d))
      .then(x => console.log(x));
      if(user){
      const userRef = doc(db, "users-planner", user.uid);
      const userData = {
        plannedMods: mods,
        eligibleMods: eligibleMods,
        warnings: warnings,
      }
      setDoc(userRef, userData);
    }
  },);

function searchMod(m){
  fetch(`${API_MODULE_INFO}${m}.json`)
  .then(res => res.json())
  .then(d => setSearchData(d))
}

<Typography>{warnings}</Typography>



  function addModule(code, grade) {
    
    mods = mods + "; " + code;
    searchMod(code);
    setCorequisites(searchData.corequisite);
    setPreclusions(searchData.preclusion);
    setPrerequsites(searchData.prerequisite);
    const modsAll = searchData.fulfillRequirements;
    setFulfillReqs(modsAll);
    console.log(searchData);
    const res = new RegExp(/(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g);

    const modsPlanned = Module.map(x => x.code);


    let precMods = [];
    let coreqMods = [];
    let containsPreclusions = false;
    let containsCorequisites = true;
    let isEligibleByPrereqs = true;

    if(preclusions){
      precMods = preclusions.match(res);
      containsPreclusions = modsPlanned.some(element => {
        return precMods.includes(element);
      });
    }

    if(corequisites){
      coreqMods = corequisites.match(res);
      containsCorequisites = coreqMods.every(element => {
        return modsPlanned.includes(element);
      });
    }

    if(prerequisites){
      isEligibleByPrereqs = eligibleMods.contains(code);
    }

    if(fulfillReqs){
      eligibleMods = eligibleMods.concat(fulfillReqs);
      //console.log(eligibleMods);
    }




    if(containsCorequisites && !containsPreclusions && !modsPlanned.includes(code) && eligibleMods.includes(code)){
      const newModule = [
        ...Module,
        {
          code: code,
          grade: grade,
          preclusions: preclusions
        }
      ];

      setModule(newModule);

    }

    if(modsPlanned.includes(code)){
      console.log("ERROR! Have you added this module twice? " + code);
      const newWarning = [...warnings, "ERROR! Have you added this module twice? " + code];
      setWarnings(newWarning);
    }
    
    else {
      if(containsPreclusions){
        if(preclusions){
          console.log("PRECLUSION WARNING: Make sure you have not added ...  " + precMods);
          const newWarning = [...warnings, "PRECLUSION WARNING: Make sure you have not added ...  " + preclusions];
          setWarnings(newWarning);
        }

      }
      if(!containsCorequisites) {
        if(corequisites){
          console.log("COREQUISITE WARNING: Remember to add these corequisites too: " + corequisites);
          const newWarning = [...warnings, "COREQUISITE WARNING: Remember to add these corequisites too: " + corequisites];
          setWarnings(newWarning);
        }
      }
      if(!isEligibleByPrereqs) {
        if(prerequisites){
          console.log("PREREQUISITE WARNING: Remember to fulfill these prerequsiites: " + prerequisites);
          const newWarning = [...warnings, "PREREQUISITE WARNING: Remember to fulfill these prerequsiites: " + prerequisites];
          setWarnings(newWarning);
        }
      }

      //console.log(warnings);

      const newModule = [
        ...Module,
        {
          code: code,
          grade: grade,
          preclusions: preclusions
        }
      ];

      setModule(newModule);

    }
 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addModule(info, addGradeText);
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
     // sx={{ width: 300, zIndex: 'modal', borderRadius: '1px'}}
      getOptionLabel = {(option) => option.moduleCode+" : "+option.title } 
      autoSelect = {true}
      renderInput={(params) => <TextField {...params} label={"Module Code"} />}
      onChange={(event, value) => { 
        if(value!==null){
          setInfo(value.moduleCode);
          modName = value.moduleCode;
        }}
      }

/>
      <p></p>
      
      <Autocomplete
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
      onChange={(event, value) => {setAddGradeText(value.l); gradeName=value.l;}}
      />

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
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {Module.map((Mod, idx) => (
                  <tr key={Mod.code}>
                    <td>{idx + 1}</td>
                    <td>{Mod.code}</td>
                    <td>{Mod.grade}</td>
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
