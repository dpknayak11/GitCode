const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const sequelize = require('./connection/database');
const userRoutes = require('./routes/routes')
const Expense = require('./model/expenseModel')
const User = require('./model/userModel')
// const authenticate = require('./middleware/auth');

var cors = require('cors')

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

app.listen(4000, () => { console.log('Server running on port 3000');

sequelize
.sync()
// .sync({force: true})
    .then(() => { console.log('Database synced') })
    .catch((err) => { console.log(err) });
});