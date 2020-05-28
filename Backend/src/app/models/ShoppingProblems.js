import Sequelize , { Model } from 'sequelize';

class ShoppingProblems extends Model{
  static init(sequelize){
    super.init({
      description:Sequelize.STRING,
    },
    {
      sequelize
    }
    );

    return this;
  }

  static associate(models){
    this.belongsTo(models.Shopping, { foreignKey: 'shopping_id' , as:'shopping'});
   
  }
}

export default ShoppingProblems;