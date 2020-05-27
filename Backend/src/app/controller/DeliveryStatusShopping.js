import * as Yup from 'yup';
import {isAfter, isBefore, setSeconds,setHours,setMinutes,startOfDay,endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Shopping from '../models/Shopping';

class DeliveryStatusShopping{
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
      shopping_id:Yup.string().required(),
      start_date:Yup.date(),
      end_date:Yup.date(),
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'});
    }

    const dateAfter = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const dateBefore = setSeconds(setMinutes(setHours(new Date(), 23), 0), 0);

    const checkhours = isAfter(new Date(), dateAfter) && isBefore(new Date(), dateBefore);

    if(!checkhours){
      return response.status(401).json({error:'The shopping can only be taken between 9am and 6pm'});
    }
    const { start_date: data } = request.body;
    const { start_date } = await Shopping.findAll({where:{start_date:data}})
    



    const checkShoppingDate = await Shopping.findAll({
      where: {
        deliv_id,
      },
    });


    if(checkShoppingDate.length >= 51){
  
      return response.status(401).json({ error: 'You can only takes 5 shopping today' });
    }


    const order = await Shopping.findOne({
      where:{
        id:request.body.shopping_id,
      }
    });
    
    order.update(request.body);

    return response.json(order);
  }
}

export default new DeliveryStatusShopping();