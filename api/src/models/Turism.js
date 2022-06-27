const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('turism', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificulty: {
            type: DataTypes.INTEGER,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM("Summer","Fall","Winter","Spring"),
        },

    }, { timestamps: false });
};