import React from "react";
import { useState } from "react";
import Box from "./Components/Box/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider } from "@mui/material";

export default function Planner() {
  const [addGradeText, setAddGradeText] = useState("");
  const [modList, setModList] = useState([]);
  const [Module, setModule] = useState([]);
  const [addModuleText, setAddModuleText] = useState("");

  function handleAddModule(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addModule(addModuleText, addGradeText);
  }

  function addModule(description, desc) {
    const newModule = [
      ...Module,
      {
        desc: desc,
        description: description,
        isComplete: false
      }
    ];
    const newModList = [
      ...modList,
      {
        description: description,
      }
    ];
    setModule(newModule);
    console.log(newModule);
    setModList(newModList);
    console.log(newModList);
  }

  return (
    <>
      <div className="Planner">
        <h1>Plan your modules!</h1>

        <main>
          <Box>
            <h2>Add Data</h2>
            <form onSubmit={handleAddModule}>
              Module Name
              <label>
                <input
                  style={{ margin: "0 1rem" }}
                  type="text"
                  value={addModuleText}
                  onChange={(event) => {
                    setAddModuleText(event.target.value);
                  }}
                />
              </label>
            </form>
            <p> </p>
            <form onSubmit={handleAddModule}>
              Input Grade
              <label>
                <input
                  style={{ margin: "0 1rem" }}
                  type="text"
                  value={addGradeText}
                  onChange={(event) => {
                    setAddGradeText(event.target.value);
                  }}
                />
              </label>
              <p> </p>
              <Button variant="contained">
                <input type="submit" value="Add" />
              </Button>
            </form>
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
                  <tr key={Mod.description}>
                    <td>{idx + 1}</td>
                    <td>{Mod.description}</td>
                    <td>{Mod.desc}</td>
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