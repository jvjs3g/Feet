import Sequelize, { Model } from 'sequelize';

class Recipient extends Model{
  static init(sequelize){
    super.init({
      name:Sequelize.STRING,
      rua:Sequelize.STRING,
      numero:Sequelize.INTEGER,
      complemento:Sequelize.STRING,
      estado:Sequelize.STRING,
      cidade:Sequelize.STRING,
      cep:Sequelize.STRING,
    },
    {
      sequelize
    }
    );
    return this;
  }

  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id' , as:'user'}),
    this.belongsTo(models.File, { foreignKey: 'avatar_id' , as:'avatar'});
  }
}

export default Recipient;
