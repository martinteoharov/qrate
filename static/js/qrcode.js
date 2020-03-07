import QrScanner from "../qr-scanner.min.js";

const upfileBtn = document.getElementById('capture');
const imageBtn  = document.getElementById('qrcode');
const videoBtn  = document.getElementById('qrcode-vid');
const videoDom  = document.getElementById('scanner');
const display   = document.getElementById('display');

const result = (link) => {
        console.log(link);
        window.location.replace(link);
}

upfileBtn.onchange = () => {
	openQRCamera(upfileBtn);
}
imageBtn.onclick = () => {
	upfileBtn.click();
}

videoBtn.onclick = () => {
	console.log('video scan:');

	const constraints = {
		video: {
			width: 1280,
			height: 720,
			facingMode: {
				ideal: 'environment'
			}
		},
		audio: false
	};

	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(stream => {
			videoDom.style.display = '';
			videoDom.srcObject = stream;

			EPPZScrollTo.scrollVerticalToElementById('scanner', 0);
			const scanner = new QrScanner(videoDom, link => result(link), 720);
			scanner.start();
		})
		.catch(error => {
			console.error(error);
		});

	setTimeout( () => newNoty('error', 'Try image scan'), 10000);

}

const openQRCamera = (node) => {
	console.log('image scan:');
	let reader = new FileReader();
	reader.onload = () => {
		node.value = "";
		qrcode.callback = (res) => {
			if(res instanceof Error) {
				newNoty('error', "No QR code found. Please move farther away from the subject. (50cm away)'");
			} else {
				newNoty('success', "Redirecting...");
				result(res);
			}
		};
		qrcode.decode(reader.result);
	};
	reader.readAsDataURL(node.files[0]);
}
