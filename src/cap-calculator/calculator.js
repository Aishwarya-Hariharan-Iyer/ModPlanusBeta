import React from "react";
import { useState } from "react";
import Box from "../module-planner/Components/Box/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";

export default function Calculator() {
  const [addGradeText, setAddGradeText] = useState("");
  const [Module, setModule] = useState([]);
  const [addMC, setAddMC] = useState(0);
  const [credits, setCredits] = useState(0);
  const [mc, setMC] = useState(0);
  const [addModuleText, setAddModuleText] = useState("");

  function handleAddModule(event) {
    // React honours default browser behavior and the
    // default behaviour for a form submission is to
    // submit AND refresh the page. So we override the
    // default behaviour here as we don't want to refresh
    event.preventDefault();
    addModule(addModuleText, addGradeText, addMC);
    console.log(addModuleText);
  }

  function addModule(description, desc, des) {
    const newModule = [
      ...Module,
      {
        des: des,
        desc: desc,
        description: description,
        isComplete: false
      }
    ];
    setMC(mc + des * 1);
    setCredits(credits + des * ComputeC(desc));
    const newNew = newModule.map((m) => m.description);
    setModule(newModule);
    //console.log(newModule);
    console.log(newNew);
    //setS(newNew);
  }

  function ComputeC(grade) {
    if (grade === "A+" || grade === "A") {
      return 5;
    }
    if (grade === "A-") {
      return 4.5;
    }
    if (grade === "B+") {
      return 4;
    }
    if (grade === "B") {
      return 3.5;
    }
    if (grade === "C+") {
      return 2.5;
    }
    if (grade === "C") {
      return 2;
    }
    if (grade === "D+") {
      return 1.5;
    }
    if (grade === "D") {
      return 1;
    }
    if (grade === "F") {
      return 0;
    }
  }

  function CAP(cred, mcs) {
    setCredits(credits + cred);
    setMC(mc + mcs);
  }

  return (
    <>
      <div className="Calculator">
        <h1>Cap Calculator</h1>

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

                  }
                  }
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
            </form>
            <p> </p>
            <form onSubmit={handleAddModule}>
              Input MC
              <label>
                <input
                  style={{ margin: "0 1rem" }}
                  type="text"
                  value={addMC}
                  onChange={(event) => {
                    setAddMC(event.target.value);
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
            <h2>Data of all modules</h2>
            <table style={{ margin: "0 auto", width: "100%" }}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Modules</th>
                  <th>Grade</th>
                  <th>MC</th>
                  <th>MC*GP</th>
                </tr>
              </thead>
              <tbody>
                {Module.map((Mod, idx) => (
                  <tr key={Mod.description}>
                    <td>{idx + 1}</td>
                    <td>{Mod.description}</td>
                    <td>{Mod.desc}</td>
                    <td>{Mod.des}</td>
                    <td>{Mod.des * ComputeC(Mod.desc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>CAP is:</h4>
            <h4>{credits / mc}</h4>
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