// Require the modules
const Sequelize = require('sequelize');

// Create the connection object
const sequelize = new Sequelize('expenses_project', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// Export the connection object
module.exports = sequelize;
