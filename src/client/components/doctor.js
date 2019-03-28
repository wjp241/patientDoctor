import React, { useState } from 'react';

function Doctor(props) {
  const [search, setSearch] = useState(null);
  const [patInfo, setPatInfo] = useState(props.patInfo);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverPost = await fetch("http://localhost:4000/doctor", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      })
      const json = await serverPost.json();
      setPatInfo(json)
    } catch (e) {
      throw e
    }
  }

  const handleChange = (e) => {
    const val = e.target.value;
    setSearch(val);
  }

  const order = ["Name", "Age", "Email", "Address", "Phone Number"];
  const rows = patInfo.reduce((acc, val) => {
    const tds = val.reduce((acc, val) => {
      acc.push(
        <td>
          {val}
        </td>
      )
      return acc;
    }, [])

    acc.push(<tr>{tds}</tr>)
    return acc;
  }, [])

  return (
    <div>
      <div>Hello DR.{props.docInfo}</div>
      <form onSubmit={handleSubmit} placeholder="Search Patient By Name">
        <input type="text" onChange={handleChange} ></input> <input type="submit"></input>
      </form>
      <div>Patient Listing</div>
      <table border="3" >
        <tr>
          {order.map(val => <th>{val}</th>)}
        </tr>
        {rows}
      </table>
    </div>
  )
}

export default Doctor;
