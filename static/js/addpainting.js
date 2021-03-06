const servicesDom   = document.getElementsByClassName('services')[0];
const addInfoDom    = document.getElementById('addInfoDom');
const changeInfoDom = document.getElementById('changeInfoDom');
const addInfoBtn    = document.getElementById('addInfoBtn');
const saveInfoBtn   = document.getElementById('saveInfoBtn');
const formDom       = document.getElementById('form_painting');
const loader        = document.getElementsByClassName('loader')[0];

// id input box
const idInput     = document.getElementById('painting_id');

saveInfoBtn.onclick = () => {
	//collect form data
	const nameVal = document.getElementById('painting_name').value;
	const boxVal  = document.getElementById('painting_text').value;
	const idVal   = idInput.value;

	//send data
	const url = '/addinfo';
	const items = {name: nameVal, text: boxVal, id: idVal};
	fetchPost(url, items).then((res) => {
		if(res.status === 200){
			newNoty('success', 'Saved');
		}
		else {
			newNoty('error', 'Could Not Be Saved');
		}
	});
}

addInfoBtn.onclick = () => {

	changeInfoDom.innerHTML  = '';
	changeInfoDom.style.display    = 'none';
	addInfoDom.style.display = '';
	idInput.value = Math.floor(Math.random()*10000000);
	EPPZScrollTo.scrollVerticalToElementById('addInfoDom', 0);
	
}
