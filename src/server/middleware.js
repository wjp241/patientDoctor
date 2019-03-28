const middleware = {};
const pool = require("./database");

middleware.findInfo = async (req, res) => {
  const { username, password } = req.body;
  try {
    let command = `select name, age, email, address, phone_number from patient where username = '${username}' and password = '${password}'`
    const result = await pool.query({ rowMode: 'array', text: command });
    if (result.rows[0]) {
      res.status(200).send([result.rows, "patient"])
    } else {
      command = `select username, password from doctor where username = '${username}' and password = '${password}'`;
      const drInfo = await pool.query({ rowMode: 'array', text: command });
      if (drInfo.rows[0]) {
        const [dr_name] = drInfo.rows[0];
        command = `select name, age, email, address, phone_number from patient`
        const patInfo = await pool.query({ rowMode: 'array', text: command })
        res.status(200).send([patInfo.rows, "doctor", { dr_name }])

      } else {
        res.status(200).send(["wrong"])
      }
    }
  } catch (e) {
    throw e;
  }

};

middleware.updateInfo = (req, res) => {
  const { username, name, age, email, address, phone_number } = req.body;
  const command = `update patient set name = '${name}' , age = ${age}, email = '${email}',address = '${address}', phone_number = '${phone_number}' where username = '${username}'`
  pool.query({ rowMode: 'array', text: command })
    .then(result => {
      res.status(200).send(["success!!!!"])
    })
    .catch(e => console.error(e.stack))

};


middleware.searchPat = (req, res) => {
  const { search } = req.body;
  const command = `select name, age, email, address, phone_number from patient where name LIKE '%${search}%'`
  pool.query({ rowMode: 'array', text: command })
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(e => console.error(e.stack))
}

module.exports = middleware;



