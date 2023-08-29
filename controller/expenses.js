const path = require('path')
const Expense = require('../model/expenseModel')
const authenticate = require('../middleware/auth')
exports.getExpenses = (req,res,next) =>{
        res.sendFile(path.join(__dirname, '../', 'views', 'expenses-page.html'))
}
exports.postExpenses = async (req,res,next) =>{
    try{
    const {amount, description, category} = req.body;
    const expenseData =await Expense.create({amount:amount, description:description, category:category,authenticate});
    return res.status(201).json({expenseData});
    }catch(err){console.log(err)}
}

exports.getData = async (req,res,next)=>{
    try{
       const details = await Expense.findAll()
            res.status(201).json({details})
            console.log(details);
       
    }catch(err){console.log(err)}
}
exports.deleteExpenses = (req,res,next) =>{
    const expenseId =req.body.obj_id;
    console.log(expenseId);
    Expense.destroy({ where: { id: expenseId} });
    console.log("Expense deleted successfully");
}
