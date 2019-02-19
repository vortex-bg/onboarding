// Write you code here, feel free to add new js files and include the in index.html script tags
// Create a new user

var myHeaders = new Headers();


function AddNewUser() {

    fetch('http://localhost:3000/auth/register', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'POST',
    body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        })
    })

}


function LoginUser() {


    fetch('http://localhost:3000/auth/login', {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'PUT',
    body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        })
    }).then((response) => {
        return(response.json());   
    }).then((responseJson) => {
        if(responseJson.success){
            window.localStorage.setItem("token",responseJson.token);
            myHeaders.append("authorization",responseJson.token);
            console.log(myHeaders.get("authorization"));
            alert("Logged in"); 
        }else {
            alert("Wrong username or password");   
        }
    });

}

