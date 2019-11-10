require('dotenv/config');
const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
const date = require('date-and-time');
const path = require('path');

const app = express();

firebase.initializeApp({
	apiKey: "AIzaSyD9JE0PToRBYGMtdlJnvcyVr6hV4hLrpjg",
    authDomain: "tt000-57d7f.firebaseapp.com",
    databaseURL: "https://tt000-57d7f.firebaseio.com",
    projectId: "tt000-57d7f",
    storageBucket: "tt000-57d7f.appspot.com",
    messagingSenderId: "229476306931",
    appId: "1:229476306931:web:8835d43339b6f8916c0c86",
    measurementId: "G-N7KW1PV7NC"
});

let db = firebase.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let port = process.env.PORT || 3000;

app.get("/data/:pH/:beratSampah/:statusSampah", (req, res) => {
	const now = new Date();
	let timestamp = date.format(now, 'YYYY/MM/DD HH:mm:ss');
	let pH = Number(req.params.pH);
	let beratSampah = Number(req.params.beratSampah);
	let statusSampah = String(req.params.statusSampah);
	try {
		db.collection("data").add({
			date: firebase.firestore.FieldValue.serverTimestamp(),
			pH: pH,
			beratSampah: beratSampah,
			statusSampah: statusSampah
		})
		.then( () => {
			return res.send("BERHASIL");
		})
		.catch( (err) => {
			console.log(err);
			return res.send("FIREBASE ERROR")
		})
	} catch (err) {
		console.log(err);
		return res.send('ERROR')
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/statistik.html'));
})

app.listen(port, () => {
	console.log(`APP on port ${port}`);
})