const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const middleware = require("./middleware");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/../../public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/../../index.html"))
});

app.post('/', middleware.findInfo)
app.post('/patient', middleware.updateInfo);
app.post('/doctor', middleware.searchPat);

const port = 4000;

app.listen(port, () => console.log('App is listening on port ' + port));

