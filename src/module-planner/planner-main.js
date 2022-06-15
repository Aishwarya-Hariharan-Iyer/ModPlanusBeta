import React from "react";
import { useState } from "react";
import Box from "./Components/Box/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider } from "@mui/material";
import SearchModBar from "./Components/SearchModBar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PlannerMain from './PlannerMain.css';
import { positions } from '@mui/system';
import BasicSelect from "./Components/GradeDropdown";


const API_NUSMODS_URL = 'https://api.nusmods.com/2018-2019/moduleInformation.json';

export default function Planner() {
  const [addGradeText, setAddGradeText] = useState('');
  const [Module, setModule] = useState([]);
  const [addModuleText, setAddModuleText] = useState("");
  const [info, setInfo] = useState('');
  const [data, setData] = React.useState([]);
  const [preclusions, setPreclusions] = React.useState("");
  let mods = "";
  //const [modsDone, setModsDone] = React.useState([]);
  

  React.useEffect(
    () => {
        fetch(API_NUSMODS_URL)
        .then(res => res.json())
        .then(d => setData(d))
    }, []
);


  function handleAddModule(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addModule(addModuleText, addGradeText);
  }

  function addModule(code, grade, preclusions) {
    const modsPlanned = Module.map(x => x.code);
    mods = mods + "; " + code;
    //const restrictions = '//(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g/';
    const res = new RegExp(/(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g);
    //const modsUpper = mods.match(res);
    //const precUpper = preclusions.match(res);
    let containsPreclusions = false;
    if(preclusions!==undefined){
    //console.log(preclusions.match(res));
    const precUpper = preclusions.match(res);
    containsPreclusions = modsPlanned.some(element => {
      return precUpper.includes(element);
    });
    //console.log(containsPreclusions);
    }
    if(!modsPlanned.includes(code) && !containsPreclusions){
    const newModule = [
      ...Module,
      {
        code: code,
        grade: grade,
        preclusions: preclusions
        //isComplete: false
      }
    ];
    setModule(newModule);
    //console.log(newModule.code);
    //console.log(newModule);
    console.log(mods);
  }
  else {
    if(containsPreclusions){
      console.log('ERROR: PRECLUSIONS THERE!');
    }
    console.log("ERROR: Already there!");
  }
  }
  return (
    <>
      <div className="Planner" style={PlannerMain.planner}>
        
        <h1>Plan your modules!</h1>

        <main>
          <Box>
            <h2>Add Data</h2>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
     // sx={{ width: 300, zIndex: 'modal', borderRadius: '1px'}}
      getOptionLabel = {(option) => option.ModuleCode+" : "+option.ModuleTitle + "   [" + option.ModuleCredit+ " MCS]"} 
      autoSelect = {true}
      renderInput={(params) => <TextField {...params} label={"Module Code"} />}
      onChange={(event, value) => {
        setInfo(value); 
        if(value!==null){
          //console.log('hi');
          setInfo(value.ModuleCode);
          //console.log("HIII" + value.Preclusion);
          setPreclusions(value.Preclusion);
        } else {
          //console.log('nay');
        }
        }}
      />
      <p></p>
      
      <Autocomplete
      disablePortal
      id="combo-box-demo"
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
      onChange={(event, value) => {setAddGradeText(value.l);}}
      />

      <p></p>
              <Button variant="contained">
                <input type="submit" value="Add" onClick={()=>{addModule(info, addGradeText, preclusions);}}/>
              </Button>
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
          <div>
            <Link href="">Head back to main page</Link>
          </div>
        </main>
      </div>
    </>
  );
} 
