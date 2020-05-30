
import Sequelize, { Model } from "sequelize";

class DelivProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Shopping, {
      foreignKey: "delivery_id",
      as: "shopping",
    });
  }
}
export default DelivProblem;