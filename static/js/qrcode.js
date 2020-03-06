const upfile  = document.getElementById('capture')
const image  = document.getElementById('qrcode');
const display = document.getElementById('display');

const result = (link) => {
        console.log(link);
        window.location.replace(link);
}
image.onclick = () => {
	upfile.click();
}

const openQRCamera = (node) => {
	var reader = new FileReader();
	reader.onload = function() {
		node.value = "";
		qrcode.callback = function(res) {
			if(res instanceof Error) {
				alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
			} else {
				console.log(res);
				result(res);
			}
		};
		qrcode.decode(reader.result);
	};
	reader.readAsDataURL(node.files[0]);
}

