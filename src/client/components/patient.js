import React, { useState } from 'react';



function Patient(props) {
  const [username, setUsername] = useState(props.username);
  const [name, setName] = useState(props.patInfo[0]);
  const [age, setAge] = useState(props.patInfo[1]);
  const [email, setEmail] = useState(props.patInfo[2]);
  const [address, setAddress] = useState(props.patInfo[3]);
  const [phone_number, setPhone_number] = useState(props.patInfo[4]);

  const handleSubmit = async () => {
    try {
      const serverPost = await fetch("http://localhost:4000/patient", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, age, email, address, phone_number }),
      })
    } catch (e) {
      throw e;
    }
  }

  const handleChange = (e, type) => {
    const val = e.target.value;
    if (type === 'Name') setName(val);
    if (type === 'Age') setAge(val);
    if (type === 'Email') setEmail(val);
    if (type === 'Address') setAddress(val);
    if (type === 'Phone Number') setPhone_number(val);

  }

  const order = [
    ["Name", name],
    ["Age", age],
    ["Email", email],
    ["Address", address],
    ["Phone Number", phone_number]
  ];

  const tb = order.reduce((acc, val) => {
    acc.push(
      <tr>
        <th>{val[0]}</th>
        <td ><input type="text" onChange={e => handleChange(e, val[0])} value={val[1]}></input></td>
      </tr>
    )
    return acc;
  }, [])

  return (
    <div>
      <span>Patient Info</span>
      <table border="3" >
        {tb}
      </table>
      <input type="submit" value='Update' onClick={handleSubmit}></input>
    </div>

  )

}

export default Patient;
