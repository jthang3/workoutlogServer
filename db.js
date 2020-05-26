const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE,"postgres",process.env.PASS,{
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate()
    .then(()=>{
        console.log(`Connected to the ${process.env.DATABASE} database`);
    })
    .catch(console.log)

module.exports = sequelize;