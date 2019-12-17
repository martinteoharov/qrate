/*server.js*/
const port         = 3000;
const fs           = require('fs');
const express      = require('express');
const bodyParser   = require('body-parser');
const app          = express();

//set up mongo client
const MongoClient  = require('mongodb').MongoClient;
const url          = 'mongodb://localhost/test';
MongoClient.connect(url, (err, client) => {
	if(err) throw err;
	else console.log('mongodb connected');


	const db = client.db('qrate');
	const collection = db.collection('paintings');

	collection.findOneAndUpdate(
		{ id : 3128040 },
		{ $inc : { id: 1 } },
	);
	collection.findOne({}, (err, result) => {
		if (err) throw err;
		console.log(result);
	});

	client.close();
});

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.static('node_modules/qr-scanner'));

app.get('/gallery', (req, res) => {
	res.sendFile(__dirname + '/static/gallery.html');
});
const server = app.listen(port, () => {
	console.log('Listening on', port);
});
