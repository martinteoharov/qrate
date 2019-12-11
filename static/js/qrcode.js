const video = document.getElementById('scanner');

// Doesn't work for mobile for some reason
const scanQR = () => {
  console.log('scanQR:');
  const videoConstraints = {
    facingMode:'user'
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
    })
    .catch(error => {
      console.error(error);
    });
}
