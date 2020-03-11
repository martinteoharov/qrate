const logInBtn = document.getElementById("logInBtn");

logInBtn.onclick = () =>{
    const userVal = document.getElementById("username").value;
    const passwordVal = document.getElementById("password").value;
    const url = '/log_in';
    const items = {logusername: userVal, logpassword: passwordVal};
    fetchPost(url, items).then((res) => {
        if(res.logged === true){
            newNoty('success', 'Loged');
            location.href = "/addinfo";   
        }
        else {
            newNoty('error', 'Could Not Be Loged');
        }
    });
}