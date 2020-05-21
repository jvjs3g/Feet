import * as Yup from 'yup';
import Deliv from '../models/Deliv';
import User from '../models/User';
import File from '../models/File';

class DelivController{


  async index(request,response){
    const { page = 1 } = request.query;

    const delivery = await Deliv.findAll({
      order:['created_at'],
      limit:20,
      offset:(page - 1) * 20,
    });

    return response.json(delivery);
  }

  async store(request,response){
    
    const schema = Yup.object().shape({
      name:Yup.string().required(),
      email:Yup.string().email().required(),
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'})
    }
    const { email } = request.body;
    const delivExists = await Deliv.findOne({
      where:{
        email,
      }
    });

    if(delivExists){
      return response.status(400).json({error:'User already exists.'});
    }


    const { name ,avatar_id } = request.body;
    const user_id = request.userId;

    const deliv = await Deliv.create({
      name,
      email,
      user_id,
      avatar_id
    });
    return response.json(deliv);
  }
}
export default new DelivController();