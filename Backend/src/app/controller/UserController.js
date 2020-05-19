import User from '../models/User';
import * as Yup from 'yup';
class UserController{
  async store(request,response){

    const schema = Yup.object().shape({
      name:Yup.string().required(),
      email:Yup.string().email().required(),
      password:Yup.string().required().min(6),
    });
 
    const userExists = await User.findOne({
      where:{
        email:request.body.email,
      }
    });

    if(userExists){
      return response.status(400).json({error:'User already exists.'});
    }

    
    const {name , email } = await User.create(request.body);

    return response.json({
      name,
      email
    });
  }
}
export default new UserController();