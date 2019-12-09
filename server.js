/*server.js*/
const fs         = require('fs');
const express    = require('express');
const bodyParser = require('body-parser');
const port       = 3000;
const app        = express();

app.use(bodyParser.json());
app.use(express.static('static'))


const server = app.listen(port, () => {
	console.log('Listening on', port);
});
