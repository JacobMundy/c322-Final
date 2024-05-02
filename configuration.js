const mode = 1;

const host_local = 'http://localhost:8080';
const host_remote = 'https://c322-final-backend-latest.onrender.com';

function getHost() {
    return mode === 0 ? host_local : host_remote;
}

function isLoggedIn() {
    if (localStorage.getItem('token')) {
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
    updateNavigationBar();
}

function removeToken() {
    localStorage.removeItem('token');
    updateNavigationBar();
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getToken()
};



updateNavigationBar();
function updateNavigationBar() {
    if (isLoggedIn()) {
        document.getElementById('header-icons').innerHTML += `
        <div style="display: flex; flex-direction: column; align-items: center;">
            <a href="login.html">
                <img src="icons/user.svg" alt="Account" width="35px" height="35px">
            </a>
            <span style="font-size: 10px; color: #888;">Logged In</span>
        </div>
        `;
    } else {
        document.getElementById('header-icons').innerHTML += `
        <div style="display: flex; flex-direction: column; align-items: center;">
            <a href="login.html">
                <img src="icons/user.svg" alt="Account" width="35px" height="35px">
            </a>
            <span style="font-size: 10px; color: #888;">Not Logged In</span>
        </div>
        `;
    }
}



async function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    let customer = { username: username, password: password };
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
                if (response.ok) {
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

function logout() {
    // Remove the username from localStorage
    localStorage.removeItem('username');
    // Refresh the page
    window.location.reload();
}