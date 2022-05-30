import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const API_NUSMODS_URL = 'https://api.nusmods.com/2018-2019/moduleInformation.json';

export default function SearchModBar() {
    const [data, setData] = React.useState("");
    const [prec, setPrec] = React.useState("");

    React.useEffect(
        () => {
            fetch(API_NUSMODS_URL)
            .then(res => res.json())
            .then(d => setData(d))
        }, []
    );

    //const preclusion = data.value.map(x=>x.ModuleCode);
    //setPrec(preclusion);
    //console.log(prec);
    //console.log(data.Preclusions);
    //const dataMod = data.map(x=>x.ModuleCode);
    //console.log(dataMod);


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 300 }}
      getOptionLabel = {(option) => option.ModuleCode} 

      renderInput={(params) => <TextField {...params} label={"Module Code"} />}
      />


  );
} 