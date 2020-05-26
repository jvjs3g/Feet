
import Sequelize , { Model } from 'sequelize';

class Shopping extends Model{
  static init(sequelize){
    super.init({
      product:Sequelize.STRING,
      canceled_at:Sequelize.DATE,
      start_date:Sequelize.DATE,
      end_date:Sequelize.DATE
    },
    {
      sequelize,
    }
    );
   
    return this;
  }

  static associate(models){
    this.belongsTo(models.Deliv, { foreignKey: 'deliv_id' , as:'deliv'}),
    this.belongsTo(models.File, { foreignKey: 'signature_id' , as:'signature'}),
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id' , as:'recipient'});
    this.belongsTo(models.User, { foreignKey:'user_id' , as:'user'});
  }

}

export default Shopping;