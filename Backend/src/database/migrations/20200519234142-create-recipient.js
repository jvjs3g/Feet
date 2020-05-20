'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      rua:{
        type:Sequelize.STRING,
        allowNull:false,
      }, 
      numero:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      complemento:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      estado:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      cidade:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      cep:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{ model: 'users', key: 'id' },
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:false,
      },
      avatar_id:{
        type:Sequelize.INTEGER,
        references:{ model: 'files', key: 'id' },
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:true,
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
    });    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recipients');
  }
};
