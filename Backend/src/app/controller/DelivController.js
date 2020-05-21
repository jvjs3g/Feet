import * as Yup from 'yup';
import Deliv from '../models/Deliv';


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

  async update(request,response){
    
    const schema = Yup.object().shape({
      name:Yup.string(),
      email:Yup.string().email(),
      avatar_id:Yup.number()
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'})
    }

    const { email } = request.body;

    const delivery = await Deliv.findByPk(request.params.id);
    
    if(email && email != delivery.email){

      const deliveryExists = await Deliv.findOne({
        where:{
          email
        }
      });

      if(deliveryExists){
        return response.status(400).json({error:'Deliv already exists.'});
      }
    }
    await delivery.update(request.body);

    return response.json(delivery);
  }
  
  async delete(request,response){
    const user_id = request.userId;

    const DelivCreatedBy = await Deliv.findByPk(request.params.id);

    if(DelivCreatedBy.user_id != user_id){
      return response.status(401).json({error:"You don't have permission to cancel this Deliv."});
    }

    await DelivCreatedBy.destroy();

    return response.json(DelivCreatedBy);
  }

}
export default new DelivController();