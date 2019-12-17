const servicesDom = document.getElementsByClassName('services')[0];
const addInfoDom  = document.getElementById('addInfoDom');
const addInfoBtn  = document.getElementById('addInfoBtn');
const saveInfoBtn = document.getElementById('saveInfoBtn');
const formDom     = document.getElementById('form_painting');


// id input box
const idInput     = document.getElementById('painting_id');
idInput.value = Math.floor(Math.random()*10000000);


saveInfoBtn.onclick = () => {
	//collect form data
	const nameVal = document.getElementById('painting_name').value;
	const boxVal  = document.getElementById('painting_text').value;
	const idVal   = idInput.value;

	

	//send data
	//TODO: security
	fetchPost({name: nameVal, text: boxVal, id: idVal}, '/addinfo/38132874');
}

addInfoBtn.onclick = () => {
	addInfoDom.style.display = '';
	EPPZScrollTo.scrollVerticalToElementById('addInfoDom', 0);
}
