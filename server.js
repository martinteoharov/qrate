/*server.js*/
const port       = 3000;
const fs         = require('fs');
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.static('node_modules/qr-scanner'));

app.get('/gallery', (req, res) => {
	res.sendFile(__dirname + '/static/gallery.html');
});
app.get('/gallery/:id', (req, res) => {
	console.log('/gallery/:id');

	fs.readFile('static/db/db.json', (err, data) => {
  	if (err) throw err;
		const db = JSON.parse(data);
		const getPage = db.find(elem => db.id === req.query.id);
		res.json(getPage);
	});
});

const server = app.listen(port, () => {
	console.log('Listening on', port);
});
