const express = require('express');

const app = express()
const port = 3000;

var transactions = [
    {
        text: "Funds withdrawn for feeding",
        date: "24 June 2020"
    },
    {
        text: "Transfer to biodun successful",
        date: "24 June 2020"
    },
    {
        text: "Transfer to Charity successful",
        date: "29 June 2020"
    },
    {
        text: "Funds withdrawn for Shopping",
        date: "30 June 2020"
    }

]

var users = [{ username: "Eunice", email: "jacob@gmail.com", balance: 500 }, { username: "", email: "" }]
// make styles show 
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/dashboard', (req, res) => {

    res.render("index", { users: users, transactions: transactions });
})

app.get('/', (req, res) => {
    res.render("login");
})
app.get('/register', (req, res) => {
    res.render("register");
})
app.listen(port, () => {
    console.log('server running')
})