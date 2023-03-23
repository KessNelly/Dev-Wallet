const sequelize = require("../config/connections.js")
const { Customer } = require("../models/customer.js")
const { deposit } = require("../models/savings.js")
const { withdrawal } = require("../models/withdrawal.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const { UsersBalance } = require("./UsersBalance.js")
const { transactions } = require("../models/transactions.js")


const saltRounds = bcrypt.genSaltSync(10);
const secret = "secret"


const register = async (req, res) => {
    const cus = {
        cusName: req.body.CustomerName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds)
    }

    Customer.findAll({
        where: {
            username: req.body.username
        }
    }).then(rs => {
        if (rs.length >= 1) {
            res.status(200).json([{ message: "username taken" }])
        }
        else {
            Customer.create(cus).then(rs => {
                console.log(rs)
                res.status(200).json([{ message: "data created" }])
            }).catch(err => {
                console.log(err)
                res.status(403).json([{ message: "err" }])
            })
        }
    }).catch(err => {
        console.log(err)
    });


}

const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    Customer.findOne({
        where: {
            username: username
        }
    }).then(rs => {
        if (rs) {
            const validity = bcrypt.compareSync(password, rs.dataValues.password)
            if (validity == true) {
                const token = jwt.sign(rs.dataValues, secret)
                res.status(200).json([{ message: token }])
            } else {
                res.status(200).json([{ message: "invalid" }])
            }
        } else {
            res.status(200).json([{ message: "invalid" }])
        }

    }).catch(err => {
        console.log(err)
    });
}

const withdraw = async (req, res) => {
    const customerID = req.decoded.custid;
    const withdrawalValue = req.body.amount;
    const balance = await UsersBalance(customerID)

    if (balance >= withdrawalValue) {

        const result = await withdrawal.create({
            Amountwithdraw: withdrawalValue,
            custid: customerID
        });
        if (result) {
            transactions.update({
                amount: balance - withdrawalValue
            },
                {
                    where: {
                        custid: customerID
                    },
                }).then(result => {
                    if (result !== null) {
                        res.status(200).json([{ message: "balance updated" }])
                    }

                }).catch(err => {
                    console.log(err);
                })
        }



    } else {
        res.status(200).json([{ message: "insufficient balance" }])
    }

}


const dashboard = async (req, res) => {
    let total = 0
    let totalwith = 0
    const customerID = req.decoded.custid
    const result = await deposit.findAll({
        where: {
            custid: customerID
        }
    })
    result.map((r) => {
        total = total + r.dataValues.Amountdep
    })
    withdrawal.findAll({
        where: {
            custid: customerID
        }
    }).then(async (rsw) => {
        rsw.map((rw) => {
            return (totalwith = totalwith + rw.dataValues.Amountwithdraw);

        });
        const balance = await UsersBalance(customerID);
        res.status(200).json([{ customer: customerID, fullname: req.decoded.cusName, savings: total, withdraw: totalwith, balance }])

    }).catch(err => {
        console.log(err)
    })
}
module.exports = { register, login, dashboard, withdraw }