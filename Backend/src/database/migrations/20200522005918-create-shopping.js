'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shopping',{
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
      },     
      recipient_id:{
        type:Sequelize.INTEGER,
        references:{ model:'recipients', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:false,
      },
      deliv_id:{
        type:Sequelize.INTEGER,
        references:{ model:'delivs', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:false,
      },
      signature_id:{
        type:Sequelize.INTEGER,
        references:{ model:'files', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:false,
      },
      product:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      canceled_at:{
        type:Sequelize.DATE,
      },
      start_date:{
        type:Sequelize.DATE,
      },
      end_date:{
        type:Sequelize.DATE,
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{ model: 'users', key: 'id' },
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull:false,
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopping');
  }
};
