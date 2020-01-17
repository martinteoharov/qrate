const id = location.href.substr(location.href.indexOf('?') + 4);
const DOM = document.getElementsByClassName('container-33')[0];

fetchGet('/exponent/' + id).then((body) => {
	console.log(body.body);
	for( const p in DOM.childNodes ){
		const pid = DOM.childNodes[p];
		if(pid.tagName == 'P'){
			const oid = (parseInt(p)+1)/2 + 1;
			pid.innerText = body.body[Object.keys(body.body)[oid]];
		}
	}
});
console.log('exponent.js:', id);
