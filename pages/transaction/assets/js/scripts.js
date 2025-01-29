// Load account data for the logged-in user
function loadAccountData() {
    checkLogin(); // Ensure user is logged in

    const email = sessionStorage.getItem('loggedInUser');
    const userData = JSON.parse(localStorage.getItem(email));

    if (userData) {
        document.getElementById('account-email').textContent = email;
        document.getElementById('current-balance').textContent = userData.balance;
        
        // Load transaction history
        displayTransactionHistory(userData.transactionHistory);
        
        // Update character message based on balance
        updateCharacterMessageBasedOnBalance(userData.balance);
    }
}

// Display transaction history
function displayTransactionHistory(history) {
    const historyTable = document.getElementById('transaction-history-body');
    historyTable.innerHTML = ''; // Clear previous data

    history.forEach(transaction => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.time}</td>
            <td>${transaction.type}</td>
            <td>$${transaction.amount}</td>
        `;
        historyTable.appendChild(newRow);
    });
}

// Deposit Function
function deposit() {
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const transactionMessage = document.getElementById('transaction-message');

    if (isNaN(amount) || amount <= 0) {
        transactionMessage.textContent = "Please enter a valid amount.";
        transactionMessage.style.color = 'red';
        return;
    }

    const userEmail = sessionStorage.getItem('loggedInUser');
    const userData = JSON.parse(localStorage.getItem(userEmail));

    console.log("Balance before deposit:", userData.balance); // Debugging
    userData.balance += amount;
    console.log("Balance after deposit:", userData.balance); // Debugging

    transactionMessage.textContent = `$${amount} deposited successfully.`;
    transactionMessage.style.color = 'green';

    userData.transactionHistory.push({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        type: 'Deposit',
        amount: amount
    });

    localStorage.setItem(userEmail, JSON.stringify(userData));
    document.getElementById('current-balance').textContent = userData.balance;

    updateCharacterMessageBasedOnBalance(userData.balance);
}

// Withdraw Function
function withdraw() {
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const transactionMessage = document.getElementById('transaction-message');

    if (isNaN(amount) || amount <= 0) {
        transactionMessage.textContent = "Please enter a valid amount.";
        transactionMessage.style.color = 'red';
        return;
    }

    const userEmail = sessionStorage.getItem('loggedInUser');
    const userData = JSON.parse(localStorage.getItem(userEmail));

    if (amount > userData.balance) {
        transactionMessage.textContent = "Insufficient balance.";
        transactionMessage.style.color = 'red';
        updateCharacterMessage("Uh oh, it looks like you don't have enough balance.");
        return;
    }

    console.log("Balance before withdrawal:", userData.balance); // Debugging
    userData.balance -= amount;
    console.log("Balance after withdrawal:", userData.balance); // Debugging

    transactionMessage.textContent = `$${amount} withdrawn successfully.`;
    transactionMessage.style.color = 'green';

    userData.transactionHistory.push({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        type: 'Withdraw',
        amount: amount
    });

    localStorage.setItem(userEmail, JSON.stringify(userData));
    document.getElementById('current-balance').textContent = userData.balance;

    updateCharacterMessageBasedOnBalance(userData.balance);
}

// Load the logged-in user's data when the transaction page loads
window.onload = function () {
    const userEmail = sessionStorage.getItem('loggedInUser');
    if (!userEmail) {
        // Redirect to login if no user is logged in
        window.location.href = '../../pages/page2/index.html';
        return;
    }

    const userData = JSON.parse(localStorage.getItem(userEmail));

    if (userData) {
        document.getElementById('current-balance').textContent = userData.balance;
        displayTransactionHistory(userData.transactionHistory);
        updateCharacterMessageBasedOnBalance(userData.balance);
    }
};

// Function to update character message based on the user's balance
function updateCharacterMessageBasedOnBalance(balance) {
    console.log("Updating character message based on balance:", balance); // Debugging
    const characterMessage = document.getElementById('character-message');

    if (balance < 1000) {
        characterMessage.textContent = "Careful, your balance is getting low. Try to save!";
    } else if (balance > 6000) {
        characterMessage.textContent = "You're saving up nicely! Keep it up!";
    } else {
        characterMessage.textContent = "Good job managing your finances!";
    }
}

// Function to check if user is logged in
function checkLogin() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = '../../pages/page2/index.html'; // Redirect to login if not logged in
    }
}
