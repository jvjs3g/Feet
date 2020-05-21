'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('delivs', { 
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
      email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
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
    return queryInterface.dropTable('delivs');
  }
};
