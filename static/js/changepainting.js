// const changeInfoDom = document.getElementById('changeInfoDom');   DECLARED
// const addInfoDom    = document.getElementById('addInfoDom');      DECLARED
const exampleContP  = document.getElementById('example-p');
const changeInfoBtn = document.getElementById('changeInfoBtn');

changeInfoBtn.onclick = () => {
	if(changeInfoDom.style.display == ''){
		return;
	}
	addInfoDom.style.display    = 'none';
	changeInfoDom.style.display = '';
	changeInfoDom.innerHTML = '';

	
	const url = 'addinfo/list/38132874';
	fetchGet(url).then((res) => {
		console.log(res.body);
		for( e of res.body ){
			const copy = exampleContP.cloneNode(true);
			copy.style.display = '';
			copy.childNodes[1].innerText = 'id - ' + e.id;
			copy.childNodes[3].innerText = 'name - ' + e.name;
			copy.childNodes[5].innerText = e.text;
			changeInfoDom.append(copy);
		}
		//this doesnt work
		EPPZScrollTo.scrollVerticalToElementById('example-p', 0);
	});

}
