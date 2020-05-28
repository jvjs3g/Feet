import * as Yup from 'yup';
import Shopping from '../models/Shopping';


class DeliveryFinishShopping{
  async update(request,response){
    
    const deliv_id = request.params.id;

    const shopping = await Shopping.findAll({
      where:{
        deliv_id,
      }
    })

    if(shopping == 0 ){
      return response.status(401).json({error:'Sorry, no shopping for you to deliver.'})
    }

    const schema = Yup.object().shape({
      shopping_id:Yup.number().required(),
      end_date:Yup.date().required()
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'});
    }

    const { shopping_id } = request.body;

    const order = await Shopping.findByPk(shopping_id);

    await order.update(request.body);
    return response.json(order);
  }
}

export default new DeliveryFinishShopping();