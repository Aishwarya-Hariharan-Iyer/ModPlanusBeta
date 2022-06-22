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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const API_NUSMODS_URL = 'https://api.nusmods.com/v2/2021-2022/moduleList.json';
const API_MODULE_INFO = 'https://api.nusmods.com/v2/2021-2022/modules/'

export default function Planner() {
  const [addGradeText, setAddGradeText] = useState('');
  const [Module, setModule] = useState([]);
  const [addModuleText, setAddModuleText] = useState("");
  const [info, setInfo] = useState('');
  const [data, setData] = React.useState([]);
  const [searchData, setSearchData] = React.useState([]);
//  const [data2, setData2] = React.useState([]);
  const [preclusions, setPreclusions] = React.useState("");
  const [corequisites, setCorequisites] = React.useState("");
  const [prerequisites, setPrerequsiites] = React.useState([]);
  const [fulfillReqs, setFulfillReqs] = React.useState([]);
  let mods = "";
  let eligibleMods = ['CS1101S'];
  const [warning, setWarning] = React.useState("");
  const [warning2, setWarning2] = React.useState("");
  //const [modsDone, setModsDone] = React.useState([]);


React.useEffect(
  () => {
      fetch(API_NUSMODS_URL)
      .then(res => res.json())
      .then(d => setData(d))
  }, []
);

function searchMod(m){
  fetch(`${API_MODULE_INFO}${m}.json`)
  .then(res => res.json())
  .then(d => setSearchData(d))
}



/**
*React.useEffect(
*  () => {
*      fetch(API_MODULE)
*      .then(res => res.json())
*      .then(d => setData2(d))
*  }, []
* );
*/

  function handleAddModule(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addModule(addModuleText, addGradeText);
    // console.log(data2);
  }

  function addModule(code, grade) {
    mods = mods + "; " + code;
    searchMod(code);
    setCorequisites(searchData.corequisite);
    setPreclusions(searchData.preclusion);
    setPrerequsiites(searchData.prerequisite);
    const modsAll = searchData.fulfillRequirements;
    setFulfillReqs(modsAll);
    console.log(searchData);
    const res = new RegExp(/(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g);
    //const prec = corequisites.match(res);
    //console.log(corequisites);
    //console.log(searchData.preclusion);

    const modsPlanned = Module.map(x => x.code);


    let precMods = [];
    let coreqMods = [];
    let containsPreclusions = false;
    let containsCorequisites = true;
    let containsPrerequisites = true;

    if(preclusions!==undefined){
      precMods = preclusions.match(res);
      containsPreclusions = modsPlanned.some(element => {
        return precMods.includes(element);
      });
    }

    if(corequisites!==undefined){
      coreqMods = corequisites.match(res);
      containsCorequisites = coreqMods.every(element => {
        return modsPlanned.includes(element);
      });
    }

    if(fulfillReqs!==undefined){
      eligibleMods = eligibleMods.concat(fulfillReqs);
      console.log(eligibleMods);
    }

    if(containsCorequisites && !containsPreclusions && !modsPlanned.includes(code) && eligibleMods.includes(code)){
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

    } else {
      if(containsPreclusions){
        const msg = 'ERROR: PRECLUSIONS THERE! Have you accidentally added these modules? '
        +  preclusions;

      }
      if(!containsCorequisites) {
        const msg = "WARNING: Remeber to add these corequisites too: " + corequisites;
        setWarning(msg); 
      }
      if(modsPlanned.includes(code)){
        const msg = "ERROR: Can't add the same module twice!";
      }
      else{
        const msg = "WARNING: Have you completed all these prerequisites ? " + prerequisites;
        setWarning2(msg);
      }


    }




  }
  return (
    <>
      <div className="Planner" style={PlannerMain.planner}>
        
        <h1>Plan your modules!</h1>

        <main>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          WARNINGS
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="red">
          WARNINGS
        </Typography>
        <Typography variant="body2">
          {warning}
          <br />
          {warning2}
        </Typography>
      </CardContent>
    </Card>
          <Box>
            <h2>Add Data</h2>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
     // sx={{ width: 300, zIndex: 'modal', borderRadius: '1px'}}
      getOptionLabel = {(option) => option.moduleCode+" : "+option.title } 
      autoSelect = {true}
      renderInput={(params) => <TextField {...params} label={"Module Code"} />}
      onChange={(event, value) => {
        setInfo(value); 
        if(value!==null){
          //console.log('hi');
          setInfo(value.moduleCode);
          //setPreclusions(value.Preclusion);
          //setCorequisites(value.Corequisite);
          //setFulfillReqs(value.Prerequisite);
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
                <input type="submit" value="Add" onClick={()=>{addModule(info, addGradeText);}}/>
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
