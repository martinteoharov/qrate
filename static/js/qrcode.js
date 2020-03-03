import QrScanner from "../qr-scanner.min.js";

const video   = document.getElementById('scanner');
const button  = document.getElementById('scanQR');
const display = document.getElementById('display');

const result = (link) => {
	console.log(link);
	window.location.replace(link);
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
			const scanner = new QrScanner(video, link => result(link), 720);
			scanner.start();
		})
		.catch(error => {
			console.error(error);
		});
}
