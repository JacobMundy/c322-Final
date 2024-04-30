const mode = 0;

const host_local = 'http://localhost:8080';
const host_remote = 'TODO';

function getHost() {
  return mode === 0 ? host_local : host_remote;
}

function isLoggedIn() {
    if(localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage
    .setItem('token', token);
    // updateNavigationBar();
}

function removeToken() {
    localStorage.removeItem('token');
    // updateNavigationBar();
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getToken()
};

// updateNavigationBar();
// function updateNavigationBar() {
//     const navbar = document.getElementsByClassName('topnav');
//     console.log(navbar);
//     let loginTag = navbar;
//     if (configuration.isLoggedIn()) {
//         loginTag.innerHTML = `<li class="right"><a href="#" onclick="logout()">Logout</a></li>`
//     } else {
//         loginTag.innerHTML = `<li class="right"><a href="login.html">Login</a></li>`
//     }   
// }


async function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let customer = {username: username, password: password};

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    };
    try {
    fetch(configuration.host() + '/signin', request)
    .then(async response => {
        if(response.ok) {
            const token = await response.text();
            setToken(token);
            location.href = 'index.html';
        } else {
            throw new Error('Login failed');
        }
    })
    } catch (error) {
        console.log(error);
        removeToken();
        alert('Login failed');
    }

}

async function logout() {
    removeToken();
}