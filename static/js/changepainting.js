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

	
	const urlLoad   = 'addinfo/list/38132874';
	const urlUpload = 'addinfo/change/38132874';

	fetchGet(urlLoad).then((res) => {
		console.log(res.body);
		for( e of res.body ){
			const copy = exampleContP.cloneNode(true);
			copy.style.display = '';
			copy.childNodes[3].innerText = e.id;
			copy.childNodes[5].innerText = e.qr;
			copy.childNodes[7].innerText = e.name;
			copy.childNodes[9].innerText = e.text;

			copy.ondblclick = () => {
				copy.childNodes[5].setAttribute('contenteditable', true);
				copy.childNodes[7].setAttribute('contenteditable', true);
				copy.childNodes[9].setAttribute('contenteditable', true);
			}
			copy.childNodes[1].onclick = () => {
				console.log('save changes');
				const idVal   = copy.childNodes[3].innerText;
				const qrVal   = copy.childNodes[5].innerText;
				const nameVal = copy.childNodes[7].innerText;
				const textVal = copy.childNodes[9].innerText;

				const obj = { id:copy.childNodes[3].innerText, qr: qrVal, name: nameVal, text: textVal };
				fetchPost(urlUpload, obj).then((res) => {
					console.log(res);
					if(res.status === 200){
						newNoty('success', 'Saved');
					}
					else{ 
						newNoty('error', 'Could Not Be Saved');
					}

				});

			}

			changeInfoDom.append(copy);
		}
		setTimeout(() => EPPZScrollTo.scrollVerticalToElementById('example-p', 0), 500);
	});

}
