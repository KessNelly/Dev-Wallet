const Sequelize = require('sequelize')
const sequelize = require('../config/connections.js')
const statement = sequelize.define('statement', {
    statementid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    statementwithdraw: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    statementdeposit: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },  


})

module.exports = { statement }