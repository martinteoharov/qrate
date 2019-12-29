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
	const urlDelete = 'addinfo/delete/38132874';

	loader.style.display = '';
	fetchGet(urlLoad).then((res) => {
		loader.style.display = 'none';
		console.log(res.body);
		for( e of res.body ){
			const copy = exampleContP.cloneNode(true);
			copy.style.display = '';
			copy.childNodes[5].innerText = e.id;
			copy.childNodes[7].innerText = e.qr;
			copy.childNodes[9].innerText = e.name;
			copy.childNodes[11].innerText = e.text;

			copy.ondblclick = () => {
				copy.childNodes[7].setAttribute('contenteditable', true);
				copy.childNodes[9].setAttribute('contenteditable', true);
				copy.childNodes[11].setAttribute('contenteditable', true);
			}
			//Save button
			copy.childNodes[1].onclick = () => {
				console.log('save changes');
				const idVal   = copy.childNodes[5].innerText;
				const qrVal   = copy.childNodes[7].innerText;
				const nameVal = copy.childNodes[9].innerText;
				const textVal = copy.childNodes[11].innerText;

				const obj = { id:copy.childNodes[5].innerText, qr: qrVal, name: nameVal, text: textVal };
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
			//Delete Button
			copy.childNodes[3].onclick = () => {
				alert('Are you sure you want to delete this painting');
				const obj = {id: copy.childNodes[5].innerText};

				fetchPost(urlDelete, obj).then((res) => {
					console.log(res);
					if(res.status === 200){
						newNoty('success', 'Painting Deleted');
					}
					else{ 
						newNoty('error', 'Could Not Be Deleted');
					}

				});
				copy.style.border = 'none';
				copy.innerHTML = '';
			}

			changeInfoDom.append(copy);
		}
		setTimeout(() => EPPZScrollTo.scrollVerticalToElementById('example-p', 0), 300);
	});

}
