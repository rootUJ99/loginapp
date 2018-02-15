const api = 'http://localhost:3000/api/usr';
let form = document.getElementById("registerform");
form.onsubmit = (e) => {
    const users={
        name : form.name.value,
        email : form.email.value,
        password : form.password.value,
        password2 : form.password2.value
    }
    console.log(users.name);
    console.log(users.email);
    console.log(users.password);
    console.log(users.password2);
    if (users.name && users.email && (users.password === users.password2)) {
        //e.preventDefault();
        // axios.post()
        axios.post(api, {
            username: users.name,
            email:users.email,
            password:users.password,
            // password2:users.password2
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('you are authenticated');
        form.action = "/dashboard";//this line just form action implementation with js
    }
    else if(users.password!==users.password2) {
        e.preventDefault();
        alert('password are mismatched');
    }
    else {
        e.preventDefault();
        alert('enter right username or password');
    }
}
// module.exports = from;