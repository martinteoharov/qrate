import QrScanner from "../qr-scanner.min.js";

const video = document.getElementById('scanner');
const button = document.getElementById('scanQR');

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
      const scanner = new QrScanner(video, result => console.log(result));
      scanner.start();
    })
    .catch(error => {
      console.error(error);
    });
}
