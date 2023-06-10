const Sequelize = require('sequelize');
const express = require('express');
require('dotenv').config();

//Create a new Sequelize instance
// const sequelize = new Sequelize('aabb', 'root', 'asdf1234', {
//   host: 'localhost',
//   dialect: 'mysql',

// });
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

//console.log(process.env.DB_HOST)
// Define a model for your table
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

async function main() {
  try {
    // Connect to the MySQL database
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the model with the database (create the table if it doesn't exist)
    await User.sync();
    console.log('User table has been created successfully.');

    // Create an Express application
    const app = express();

    // Define a route to handle GET requests
    app.get('/', async (req, res) => {
      try {
        // Perform database operations
        // Example: Retrieve all users
        const users = await User.findAll();
        res.json(users);
      } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Start the server and listen on localhost
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the main function
main();
