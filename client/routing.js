var homePage = "<h1>Vortex Onboarding App (and remeber that Paco is watching you!)</h1> <div style=\"display: flex, \"> <img style=\"width: 200px; height: 200px\" src=\"https://scontent.fsof5-1.fna.fbcdn.net/v/t1.0-9/21298_913566192037101_3381811899311387380_n.jpg?_nc_cat=101&_nc_ht=scontent.fsof5-1.fna&oh=494e08d7282cb4b7a88fa302496b6cd7&oe=5CEF68CB\"/> </div>";
var loginPage = "<h1>Login</h1> <input type=\"text\" id=\"username\" placeholder=\"username\"> <input type=\"text\" id=\"password\" placeholder=\"password\"> <button onclick=\"LoginUser()\">Login</button>";
var registerPage = "<h1>Regiser</h1> <input type=\"text\" id=\"username\" placeholder=\"username\"> <input type=\"text\" id=\"password\" placeholder=\"password\"> <input type=\"text\" id=\"firstName\" placeholder=\"firstName\"> <input type=\"text\" id=\"lastName\" placeholder=\"lastName\"> <button onclick=\"AddNewUser()\">Register</button>";

var routes = {
    '': homePage,
    'login': loginPage,
    'register': registerPage,
};

let contentDiv = document.getElementById('content');

function changeHash(page) {
    window.location.href = "http://127.0.0.1:3000/#" + page;
}

function redirect(event) {
    var hash = window.location.hash.split("#")[1] || "";
    if(!(routes[hash] || hash === "")){
        console.log("Page not found");
        return null;
    }
    contentDiv.innerHTML = routes[hash];
}

window.addEventListener('hashchange', redirect);
window.addEventListener('load', redirect);