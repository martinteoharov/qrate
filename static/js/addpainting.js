const servicesDom = document.getElementsByClassName('services')[0];
const addInfoDom  = document.getElementById('addInfoDom');
const addInfoBtn  = document.getElementById('addInfoBtn');

addInfoBtn.onclick = () => {
	addInfoDom.style.display = '';
	EPPZScrollTo.scrollVerticalToElementById('addInfoDom', 0);
}
