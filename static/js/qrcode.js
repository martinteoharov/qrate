import QrScanner from "../qr-scanner.min.js";

const video   = document.getElementById('scanner');
const button  = document.getElementById('scanQR');
const display = document.getElementById('display');

const result = (id) => {
	console.log(id);
	window.href = 'auditorium.tk/exponent?id=' + id;
}

button.onclick = () => {
	console.log('scanQR:');
	const videoConstraints = {
		facingMode:'environment'
	};

	const constraints = {
		video: videoConstraints,
		audio: false
	};

	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(stream => {
			video.style.display = '';
			video.srcObject = stream;
			EPPZScrollTo.scrollVerticalToElementById('scanner', 0);
			const scanner = new QrScanner(video, id => result(id), 1080);
			scanner.start();
		})
		.catch(error => {
			console.error(error);
		});
}
