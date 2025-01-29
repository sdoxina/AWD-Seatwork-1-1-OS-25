// Store user data in localStorage (you can switch this to a backend database if needed)

function signupUser(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (localStorage.getItem(email)) {
        document.getElementById('signup-message').textContent = "Account already exists. Please login.";
        return;
    }

    const initialBalance = 5000;
    const userData = {
        email,
        password,
        balance: initialBalance,
        transactionHistory: [{
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            type: 'Initial Balance',
            amount: initialBalance
        }]
    };

    localStorage.setItem(email, JSON.stringify(userData));
    document.getElementById('signup-message').textContent = "Account created successfully with an initial balance of $5000!";
    setTimeout(() => window.location.href = '../../pages/login/index.html', 1500);
}


function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const userData = JSON.parse(localStorage.getItem(email));

    if (!userData || userData.password !== password) {
        document.getElementById('login-message').textContent = "Invalid email or password.";
        return;
    }

    // Store the logged-in user in sessionStorage (simulating a login session)
    sessionStorage.setItem('loggedInUser', email);
    window.location.href = '../../pages/transaction/index.html'; // Redirect to account page after successful login
}

function checkLogin() {
    if (!sessionStorage.getItem('loggedInUser')) {
        window.location.href = '../../pages/login/index.html'; // Redirect to login if not logged in
    }
}

function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = '../../pages/login/index.html'; // Redirect to login after logout
}
