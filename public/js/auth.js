const api = 'http://localhost:3000/api/usr';
axios.get(api).then(response => {
    console.log(response);
    let usr = response.data.data[0].username;
    let pass = response.data.data[0].password
    console.log(usr, pass);
    let form = document.getElementById("loginform");
    form.onsubmit = (e) => {
        let username = form.usr.value;
        let password = form.pass.value;
        console.log(username);
        console.log(password);
        if (username == usr && password == pass) {
            localStorage.setItem('username', username);
            console.log('you are authenticated');
            form.action = "/dashboard";//this line just form action implementation with js
        }
        else {
            e.preventDefault();
            alert('enter right username or password');
        }
    }
}); 