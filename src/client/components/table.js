import React from 'react';

function Table(props) {
  const order = ["Name", "Age", "Email", "Address", "Phone Number"];
  const arr = props.patInfo.reduce((acc, val) => {
    val.forEach((val, j) => {
      acc.push(

        <tr>
          <th>{order[j]}</th>
          <td ><input type="text" value={val}></input></td>
        </tr>
      )
    })
    return acc;
  }, []);

  return (
    <table border="3" >
      {arr}
    </table>
  )
}


export default Table;
