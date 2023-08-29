const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const expensesController =require('../controller/expenses')
const authenticate = require('../middleware/auth.js')

router.get('/',loginController.getSingUpForm);

router.post('/singup',loginController.postSingUpUser);
router.get('/singin', loginController.getSingInForm);
router.post('/singin', loginController.postSingInUser);
router.get('/getexpense', authenticate,expensesController.getExpenses);

router.post('/postexpense',authenticate,expensesController.postExpenses);
router.get('/getdata', authenticate,expensesController.getData);
router.post('/delete-expense',expensesController.deleteExpenses)

module.exports = router;