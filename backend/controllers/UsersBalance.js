const Transaction = require("../models/transactions.js");
const UsersBalance = require("../controllers/UsersBalance.js")

const Usersbalance = async (custid) => {
    const allTransactions = awaitTransaction.findAll({
        where: {
            custid: custid,
        },
    });

    if (!allTransactions.length) {
        return 0;
    }

    console.clear();

    let balance = 0;

    for (const i of allTransactions) {
        balance += i.amount;
    }
    return balance;
};

module.exports = { UsersBalance }