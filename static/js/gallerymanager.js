const submitDetailsBtn = document.getElementById("saveUserBtn");
const logInBtn = document.getElementById("logInBtn");

submitDetailsBtn.onclick = () => {
    const nameVal = document.getElementById("name").value;
    const userVal = document.getElementById("username").value;
    const passwordVal = document.getElementById("password").value;
    const phoneVal = document.getElementById("phone").value;

    const url = '/sign_up';
	const items = {name: nameVal, username: userVal, password: passwordVal, phone: phoneVal};
	fetchPost(url, items).then((res) => {
		if(res.status === 200){
            newNoty('success', 'Saved');
		}
		else {
			newNoty('error', 'Could Not Be Saved');
		}
    });
}

logInBtn.onclick = () => {
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");

    name.style.display = 'none';
    phone.style.display = 'none';
    submitDetailsBtn.style.display = 'none';

    logInBtn.onclick = () => {
        const userVal = document.getElementById("username").value;
        const passwordVal = document.getElementById("password").value;

        const url = '/sign_up';
        const items = {logusername: userVal, logpassword: passwordVal};
        fetchPost(url, items).then((res) => {
            if(res.status === 200){
                newNoty('success', 'Loged');
            }
            else {
                newNoty('error', 'Could Not Be Loged');
            }
        });
    }

}