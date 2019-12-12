import QrScanner from "../qr-scanner.min.js";

const video   = document.getElementById('scanner');
const button  = document.getElementById('scanQR');
const display = document.getElementById('display');

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
      video.srcObject = stream;
      EPPZScrollTo.scrollVerticalToElementById('scanner', 20);
      const scanner = new QrScanner(video, result => display.innerText = result, 1080);
      scanner.start();
    })
    .catch(error => {
      console.error(error);
    });
}
