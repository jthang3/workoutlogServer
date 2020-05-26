module.exports = (sequelize,DataType)=>{
    let table = sequelize.define("log",{
        description: DataType.STRING,
        definition: DataType.STRING,
        result: DataType.STRING,
        owner_id: DataType.INTEGER
    });
    return table;
}