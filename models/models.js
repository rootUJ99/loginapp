const Sequelize = require('sequelize');
const con = new Sequelize('orm', 'root', 'fsoc', {
    host: 'localhost',
    dialect: 'mysql'
});

const Users = con.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        //unique:true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        timestamps: false,
    });

module.exports={
    con,
    Users
}