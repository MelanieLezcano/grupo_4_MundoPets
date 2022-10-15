const {sequelize} =require('../database/models')


const dbConnectionTest = async () => {

    try{
    await sequelize.authenticate()
    console.log("la coneccion fue exitosa");

    }catch (error){
    console.log("error, no se pudo conectar", error);
}

}

module.exports = dbConnectionTest