const submitDetailsBtn = document.getElementById("sendRequestBtn");
const logInBtnRedirect = document.getElementById("logInBtnRedirect");

submitDetailsBtn.onclick = () => {
    const nameVal = document.getElementById("name").value;
    const emailVal = document.getElementById("email").value;
    const addressVal = document.getElementById("address").value;
    const phoneVal = document.getElementById("phone").value;
    const aboutVal = document.getElementById("sign_up_text_area").value;

    const url = '/sign_up';
	const items = {name: nameVal, email: emailVal, address: addressVal, phone: phoneVal, about: aboutVal};
	fetchPost(url, items).then((res) => {
		if(res.status === 200){
            newNoty('success', 'Saved');
		}
		else {
			newNoty('error', 'Could Not Be Saved');
		}
    });
}

logInBtnRedirect.onclick = () => {
    location.href="/log_in";
}