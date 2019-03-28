import React, { useState, useEffect } from 'react';
import Patient from './patient.js';
import Doctor from './doctor.js';

function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [patOrDr, setPatOrDr] = useState(null);
  const [patInfo, setPatInfo] = useState(null);
  const [docInfo, setDocInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverPost = await fetch("http://localhost:4000/", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const json = await serverPost.json();
      if (json[1] === "patient") {
        setPatInfo(json[0]);
        setPatOrDr(json[1]);
      } else if (json[1] === "doctor") {
        setPatInfo(json[0]);
        setPatOrDr(json[1]);
        setDocInfo(json[2].dr_name);
      } else {
        setPatOrDr(json[0]);
      }
    } catch (e) {
      throw e;
    }
  }

  const handleChange = (e, type) => {
    const val = e.target.value;
    if (type === 'username') setUsername(val);
    if (type === 'password') setPassword(val);
  }

  return (
    <>
      {patOrDr === "doctor" || patOrDr === "patient" ? null :
        <div>
          <form onSubmit={handleSubmit}>
            {patOrDr === "wrong" ? <div>Username/Password incorrect </div> : null}
            <input type="text" onChange={e => handleChange(e, "username")}></input>
            <input type="password" onChange={e => handleChange(e, "password")}></input>
            <input type="submit"></input>
          </form>
        </div>
      }
      {
        patOrDr === "wrong" || patOrDr === null ?
          null : patOrDr === "patient" ?
            <Patient username={username} patInfo={patInfo[0]}></Patient> : <Doctor patInfo={patInfo} docInfo={docInfo}></Doctor>
      }
    </>
  );
}

export default App;

