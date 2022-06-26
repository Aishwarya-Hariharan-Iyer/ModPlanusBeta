import React, { useState } from "react";

function WarningMod() {

    const [warnings, setWarnings] = useState([]);
    const [newWarningText, setNewWarningText] = useState("");
  
  
    function handleWarning(event) {
      event.preventDefault();
      addWarning(newWarningText);
    }
  
    function addWarning(warn) {
      const newWarnings = [
        ...warnings,
        {
          description: warn,
          isComplete: false
        }
      ];
      setWarnings(newWarnings);
      console.log(newWarnings);
    }
    return (
    <>
        <div>
            <h2>Warnings</h2>
            <form onSubmit={handleWarning}>
                <label>
                Warning:
                <input
                    style={{ margin: "0 1rem" }}
                    type="text"
                    value={newWarningText}
                    onChange={(event) => setNewWarningText(event.target.value)}
                />
                </label>
                <input type="submit" value="Add" />
            </form>
        </div>
            <div>
            <h2>Warnings</h2>
            {warnings.length > 0 ? (
                <WarningList warnings={warnings} setWarnings={setWarnings} />
            ) : (
                <p>No warnings</p>
            )}
            </div>
        </>
      );
    }
  
    function WarningList(props) {
      const { warnings, setWarnings } = props;
    
      function handleWarningCompletionToggled(toToggleWarning, toToggleWarningIndex) {
        const newWarnings = [
          ...warnings.slice(0, toToggleWarningIndex),
          {
            description: toToggleWarning.description,
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
                  <tr key={warns.description}>
                    <td>{index + 1}</td>
                    <td>{warns.description}</td>
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
export default WarningMod;