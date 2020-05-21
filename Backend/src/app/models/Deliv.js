import Sequelize, { Model } from 'Sequelize';

class Deliv extends Model{
  static init(sequelize){
    super.init({
      name:Sequelize.STRING,
      email:Sequelize.STRING
    },
    {
      sequelize
    }
    );
    return this;
  }
  
  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id', as:'user'}),
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as:'avatar'});
  }
}

export default Deliv;