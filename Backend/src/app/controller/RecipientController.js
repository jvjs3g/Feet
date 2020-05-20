import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';

class RecipientController{
  async store(request,response){

    const schema = Yup.object().shape({
      name:Yup.string().required(),
      rua:Yup.string().required(),
      numero:Yup.number().required(),
      complemento:Yup.string(),
      estado:Yup.string().required(),
      cidade:Yup.string().required(),
      cep:Yup.string().required(),
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'})
    }

    const user_id = request.userId;
    const { name, rua, numero, complemento, estado, cidade, cep, avatar_id } = request.body;

    const recipient = await Recipient.create({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
      user_id,
      avatar_id
    });

    return response.json(recipient);
  }

  async index(request,response){
    const { page = 1 } = request.query;

    const recipient = await Recipient.findAll({
      order:['created_at'],
      limit:20,
      offset:(page - 1) * 20,
      include:[
        {
          model:User,
          as:'user',
          attributes:['id','name'],
          include:[
            {
              model:File,
              as:'avatar',
              attributes:['id','path','url'],
            }
          ]
        }
      ]
    });

    return response.json(recipient);
  }

  async update(request,response){
    
    const schema = Yup.object().shape({
      name:Yup.string(),
      rua:Yup.string(),
      numero:Yup.number(),
      complemento:Yup.string(),
      estado:Yup.string(),
      cidade:Yup.string(),
      cep:Yup.string(),
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'})
    }

    const recipient = await Recipient.findByPk(request.params.id);
    
    await recipient.update(request.body);

    return response.json(recipient);
  }

  async delete(request,response){
    const user_id = request.userId;

    const recipientCreatedBy = await Recipient.findByPk(request.params.id);

    if(recipientCreatedBy.user_id != user_id){
      return response.status(401).json({
        error:"You don't have permission to cancel this Recipient."
      });
    }
    await recipientCreatedBy.destroy();

    return response.json(recipientCreatedBy);
  }
}
export default new RecipientController();