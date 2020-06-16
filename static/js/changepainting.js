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

	
	const urlLoad   = 'addinfo/list';
	const urlUpload = 'addinfo/change';
	const urlDelete = 'addinfo/delete';

	loader.style.display = '';
	fetchGet(urlLoad).then((res) => {
		loader.style.display = 'none';
		console.log(res);
		for( e of res.body ){
			const copy = exampleContP.cloneNode(true);
			copy.style.display = '';
			copy.childNodes[5].innerText = e.id;
			copy.childNodes[7].innerText = e.name;
			copy.childNodes[9].innerText = e.text;

			copy.ondblclick = () => {
				copy.childNodes[7].setAttribute('contenteditable', true);
				copy.childNodes[9].setAttribute('contenteditable', true);
				copy.childNodes[11].setAttribute('contenteditable', true);
			}
			//Save button
			copy.childNodes[1].onclick = () => {
				console.log('save changes');
				const idVal   = copy.childNodes[5].innerText;
				const nameVal = copy.childNodes[7].innerText;
				const textVal = copy.childNodes[9].innerText;

				const obj = { id:copy.childNodes[5].innerText, name: nameVal, text: textVal };
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
