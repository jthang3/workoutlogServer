module.exports = (sequelize,DataType)=>{
    const table = sequelize.define("user",{
        username: {
            type: DataType.STRING,
            required: true
        },
        passwordhash: {
            type: DataType.STRING,
            required: true
        }
    })
    return table;
}