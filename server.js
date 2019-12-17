/*server.js*/
const port         = 3000;
const fs           = require('fs');
const express      = require('express');
const bodyParser   = require('body-parser');
const app          = express();

//set up mongo client
const MongoClient  = require('mongodb').MongoClient;
const url          = 'mongodb://localhost/test';
let collection;
MongoClient.connect(url, (err, cli) => {
	if(err) throw err;
	else console.log('mongodb connected');

	const db = cli.db('qrate');
	collection = db.collection('paintings');
});

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.static('node_modules/qr-scanner'));

app.get('/gallery', (req, res) => {
	res.sendFile(__dirname + '/static/gallery.html');
});

app.get('/addinfo', (req, res) => {
	//improvised solution but good enough
	req.query.pass == 38132874 ? res.sendFile(__dirname + '/static/addinfo.html') : null;
	
});
app.post('/addinfo/38132874', (req, res) => {
	collection.insertOne({id: req.body.id, name: req.body.name, text: req.body.text});
	//fix this shit
	collection.createIndex({'id': 2}, {unique: true});

});

const server = app.listen(port, () => {
	console.log('Listening on', port);
});
