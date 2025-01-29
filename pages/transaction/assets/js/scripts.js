let balance = 0;
let transactionHistory = [];

// Create Account Function
function createAccount() {
    balance = 5000;
    document.getElementById('current-balance').textContent = balance;
    document.getElementById('account-status').textContent = "Account created with a balance of $5000.";
    document.getElementById('transaction-section').style.display = 'block';
    document.getElementById('history-section').style.display = 'block';
    
    // Automatically add the initial balance to the transaction history
    addToHistory('Initial Balance', 5000);

    // Update character message
    updateCharacterMessage("Great! You've got $5000 to start. Let's try making a deposit or withdrawal.");
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

    balance += amount;
    document.getElementById('current-balance').textContent = balance;
    transactionMessage.textContent = `$${amount} deposited successfully.`;
    transactionMessage.style.color = 'green';

    addToHistory('Deposit', amount);

    // Update character message based on balance
    if (balance > 6000) {
        updateCharacterMessage("You're saving up nicely! Keep it up!");
    } else {
        updateCharacterMessage("Good deposit! Make sure to save wisely.");
    }
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

    if (amount > balance) {
        transactionMessage.textContent = "Insufficient balance.";
        transactionMessage.style.color = 'red';
        updateCharacterMessage("Uh oh, it looks like you don't have enough balance.");
        return;
    }

    balance -= amount;
    document.getElementById('current-balance').textContent = balance;
    transactionMessage.textContent = `$${amount} withdrawn successfully.`;
    transactionMessage.style.color = 'green';

    addToHistory('Withdraw', amount);

    // Update character message based on balance
    if (balance < 1000) {
        updateCharacterMessage("Careful, your balance is getting low. Try to save!");
    } else {
        updateCharacterMessage("Good withdrawal, but make sure to save some for later!");
    }
}

// Add Transaction to History (Table Format)
function addToHistory(type, amount) {
    const historyTable = document.getElementById('transaction-history-body');
    const newRow = document.createElement('tr');
    
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    
    // Create new table cells for date, time, type, and amount
    const dateCell = document.createElement('td');
    dateCell.textContent = date;

    const timeCell = document.createElement('td');
    timeCell.textContent = time;

    const typeCell = document.createElement('td');
    typeCell.textContent = type;

    const amountCell = document.createElement('td');
    amountCell.textContent = `$${amount}`;

    // Append the cells to the new row
    newRow.appendChild(dateCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(typeCell);
    newRow.appendChild(amountCell);

    // Append the new row to the history table
    historyTable.appendChild(newRow);
}

// Update the character's message
function updateCharacterMessage(message) {
    const characterMessage = document.getElementById('character-message');
    characterMessage.textContent = message;
}
