import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import Deliv from '../app/models/Deliv';
import Shopping from '../app/models/Shopping';
import DelivProblem from '../app/models/DelivProblem';


const models = [User, File, Recipient, Deliv, Shopping, DelivProblem];
class Database {
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }
}
export default new Database();