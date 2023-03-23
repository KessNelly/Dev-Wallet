const Sequelize = require('sequelize')
const sequelize = require('../config/connections.js')
const transactions = sequelize.define('transactions', {
    transactionsid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    narration: {
        type: Sequelize.STRING,
        allowNull: true
    },
    custid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
            model: 'customer',
            key: 'custid'
        }
    }


})

module.exports = { transactions }