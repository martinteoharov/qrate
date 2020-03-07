/*server.js*/
const port         = 3000;
const fs           = require('fs');
const express      = require('express');
const bodyParser   = require('body-parser');
const app          = express();
const mongoose = require('mongoose');

//set up mongo client
const MongoClient  = require('mongodb').MongoClient;
const url          = 'mongodb://localhost/test';
const User         = require('./static/js/galleryUser');
const session      = require('express-session');
let collection;

MongoClient.connect(url, (err, cli) => {
	if(err) throw err;
	else console.log('mongodb connected');

	const db = cli.db('qrate');
	collection = db.collection('paintings');
	collection.createIndex({'id': 1}, {unique: true});
});

mongoose.connect(url);
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	// we're connected!
});


app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.static('node_modules/qr-scanner'));
app.use(express.static('node_modules/noty'));

app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false
}));

app.get('/gallery', (req, res) => {
	res.sendFile(__dirname + '/static/gallery.html');
});
app.get('/exponent', (req, res) => {
	/*
	const options = {
		headers: {
			'name': 'NAME',
			'text': 'TEXT'
		}
	}
	*/
	res.sendFile(__dirname + '/static/exponent.html');
});
app.get('/exponent/:id', (req, res) => {
	const id = req.params.id;
	let obj;
	collection.findOne({"id": id}, (err, result) => {
		obj = result;
		console.log(obj);
		res.json({"id": id, "body": obj});
	});
});

app.get('/addinfo', (req, res) => {
	//TODO: security & data validity check
	//req.query.pass == 38132874 ?
	res.sendFile(__dirname + '/static/addinfo.html');

});
app.get('/addinfo/list/38132874', (req, res) => {
	User.findOne({ _id: req.session.userId }).exec((err, user) => {
		console.log(user.paintings);
		let listArray = [];
		collection.find().toArray((err, docs) => {
			docs.forEach(element => {
				console.log(element.id);
				if(user.paintings.find(value => value == element.id)){
					listArray.push(element);
				}
			})
			res.json({body:listArray});
		});
	});
});
app.post('/addinfo/38132874', (req, res) => {
	//TODO: security & data validity check
	console.log('insert new element with id:', req.body.id);
	User.updateOne(
		{ _id: req.session.userId },
		{
			$push: {
				paintings: req.body.id
			}
		}
		, (err) => {
			if(err){
				return err;
			}
		}
	);
	collection.insertOne({id: req.body.id, name: req.body.name, text: req.body.text});
	res.json({status:200});
});
app.post('/addinfo/change/38132874', (req, res) => {
	//TODO: security & data validity check
	console.log('change element with id:', req.body.id);
	collection.updateOne(
		{ id: req.body.id },
		{
			$set: {
				qr:   req.body.qr,
				name: req.body.name,
				text: req.body.text
			}
		}
	)
	res.json({status:200});
});
app.post('/addinfo/delete/38132874', (req, res) => {
	//TODO: security & data validity check
	console.log('delete element with id:', req.body.id);
	collection.remove(
		{id: req.body.id},
		{justOne: true}
	)
	res.json({status:200});
}); 


app.get('/sign_up', (req, res, next) => {
	res.sendFile(__dirname + '/static/sign_up.html')
});

app.post('/sign_up', (req, res, next) => {
	if (req.body.name &&
		req.body.username &&
		req.body.password &&
		req.body.phone) {

		const userData = {
			name: req.body.name,
			username: req.body.username,
			password: req.body.password,
			phone: req.body.phone
		}

		User.create(userData, (error, user) => {
			if (error) {
				return next(error);
			} else {
				req.session.userId = user._id;
				console.log("Signed: "  + user)
				return res.redirect('/gallery');
			}
		});

	} 
	else if (req.body.logusername && req.body.logpassword) {
		User.authenticate(req.body.logusername, req.body.logpassword, (error, user) => {
			if (error || !user) {
				const err = new Error('Wrong email or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				console.log("Logged: "  + user);
				res.json({"logged" : true});
			}
		});
	}
	else {
		const err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
})

// GET for logout logout ::: TODO later
app.get('/logout', (req, res, next) => {
	if (req.session) {
		// delete session object
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/index');
			}
		});
	}
});


const server = app.listen(port, () => {
	console.log('listening on', port);
});
