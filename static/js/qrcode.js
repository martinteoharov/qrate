const video = document.getElementById('scanner');

const scanQR = () => {
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
    })
    .catch(error => {
      console.error(error);
    });
}
