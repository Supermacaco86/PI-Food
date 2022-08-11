const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
    score: {
      type: DataTypes.STRING,
    },
    healthScore: {
        type: DataTypes.STRING,
      },  
    steps: {
      type: DataTypes.STRING,
    },
  });
};