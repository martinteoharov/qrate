import QrScanner from "../qr-scanner.min.js";

const upfile  = document.getElementById('upfile')
const image  = document.getElementById('qrcode');
const display = document.getElementById('display');

const result = (link) => {
        console.log(link);
        window.location.replace(link);
}

image.onclick = () => {
        document.getElementById("upfile").click();
}

upfile.onchange = (obj) => {
        var file = upfile.value;
        var fileName = file.split("\\");
        document.getElementById("qrcode").innerHTML = fileName[fileName.length - 1];
        event.preventDefault();

        QrScanner.scanImage(file)
                .then(link => result(link))
                .catch(error => console.log(error || 'No QR code found.'));
}

