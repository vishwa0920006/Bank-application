class Account {
    constructor(accountHolderName, email, phone, bankName, password) {
        this.accountHolderName = accountHolderName;
        this.email = email;
        this.phone = phone;
        this.bankName = bankName;
        this.password = password;
        this.accountNumber = this.generateAccountNumber();
        this.accountId = this.generateAccountId();
        this.balance = 0.0;
    }

    generateAccountNumber() {
        return "ACC" + Math.floor(Math.random() * 1000000);
    }

    generateAccountId() {
        return "ID" + Math.floor(Math.random() * 100000);
    }

    creditAmount(amount) {
        this.balance += amount;
        return `₹${amount} credited. New balance: ₹${this.balance}`;
    }

    debitAmount(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return `₹${amount} debited. New balance: ₹${this.balance}`;
        } else {
            return `Insufficient balance to debit ₹${amount}`;
        }
    }

    viewBalance() {
        return this.balance;
    }

    displayDetails() {
        return `Account Holder: ${this.accountHolderName}
Email: ${this.email}
Phone: ${this.phone}
Bank: ${this.bankName}
Password: ${'*'.repeat(this.password.length)}
Account Number: ${this.accountNumber}
Account ID: ${this.accountId}
Balance: ₹${this.balance}`;
    }

    getAccountId() {
        return this.accountId;
    }

    getAccountNumber() {
        return this.accountNumber;
    }
}

class AccountManager {
    constructor() {
        this.accounts = [];
    }

    createAccount(accountHolderName, email, phone, bankName, password) {
        const newAccount = new Account(accountHolderName, email, phone, bankName, password);
        this.accounts.push(newAccount);
        return `✅ Account created successfully!
🔐 Your account number is: ${newAccount.getAccountNumber()}
🆔 Your account ID is: ${newAccount.getAccountId()}`;
    }

    searchAccount(accountId) {
        for (const account of this.accounts) {
            if (account.getAccountId().toLowerCase() === accountId.toLowerCase()) {
                return account;
            }
        }
        return null;
    }
}

const accountManager = new AccountManager();

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.style.animation = 'none'; // Reset animation
    });
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    // Trigger reflow to restart animation
    targetSection.offsetHeight;
    targetSection.style.animation = 'slideIn 0.3s ease-out';
}

document.getElementById('createForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const bankName = document.getElementById('bankName').value;
    const password = document.getElementById('password').value;
    const result = accountManager.createAccount(name, email, phone, bankName, password);
    document.getElementById('createResult').innerText = result;
    this.reset();
});

document.getElementById('creditForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('creditId').value;
    const password = document.getElementById('creditPassword').value;
    const amount = parseFloat(document.getElementById('creditAmount').value);
    const account = accountManager.searchAccount(id);
    if (account) {
        if (account.password === password) {
            const result = account.creditAmount(amount);
            document.getElementById('creditResult').innerText = result;
        } else {
            document.getElementById('creditResult').innerText = `❌ Incorrect password`;
        }
    } else {
        document.getElementById('creditResult').innerText = `❌ No account found with ID: ${id}`;
    }
    this.reset();
});

document.getElementById('debitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('debitId').value;
    const password = document.getElementById('debitPassword').value;
    const amount = parseFloat(document.getElementById('debitAmount').value);
    const account = accountManager.searchAccount(id);
    if (account) {
        if (account.password === password) {
            const result = account.debitAmount(amount);
            document.getElementById('debitResult').innerText = result;
        } else {
            document.getElementById('debitResult').innerText = `❌ Incorrect password`;
        }
    } else {
        document.getElementById('debitResult').innerText = `❌ No account found with ID: ${id}`;
    }
    this.reset();
});

document.getElementById('balanceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('balanceId').value;
    const password = document.getElementById('balancePassword').value;
    const account = accountManager.searchAccount(id);
    if (account) {
        if (account.password === password) {
            document.getElementById('balanceResult').innerText = `💰 Current Balance: ₹${account.viewBalance()}`;
        } else {
            document.getElementById('balanceResult').innerText = `❌ Incorrect password`;
        }
    } else {
        document.getElementById('balanceResult').innerText = `❌ No account found with ID: ${id}`;
    }
    this.reset();
});

document.getElementById('detailsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('detailsId').value;
    const password = document.getElementById('detailsPassword').value;
    const account = accountManager.searchAccount(id);
    if (account) {
        if (account.password === password) {
            document.getElementById('detailsResult').innerText = account.displayDetails();
        } else {
            document.getElementById('detailsResult').innerText = `❌ Incorrect password`;
        }
    } else {
        document.getElementById('detailsResult').innerText = `❌ No account found with ID: ${id}`;
    }
    this.reset();
});
