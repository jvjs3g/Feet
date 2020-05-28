import * as Yup from 'yup';
import {isAfter, isBefore, setSeconds,setHours,setMinutes,startOfDay,endOfDay,parseISO } from 'date-fns';
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
    });
//
    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'});
    }

    const startDate = parseISO(request.body.start_date);

    const dateAfter = setSeconds(setMinutes(setHours(startDate, 8), 0), 0);
    const dateBefore = setSeconds(setMinutes(setHours(startDate, 22), 0), 0);

    if (isAfter(startDate, dateBefore) || isBefore(startDate, dateAfter)) {
      return response.status(400).json({ error: 'Orders pickup only between 08:00 and 18:00h' });
    }

    const shoppingOfday = await Shopping.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    if(shoppingOfday.length >= 5){
      return response.status(401).json({error:"sorry, you can't make more than 5 deliver in a day"})
    }

    const { shopping_id } = request.body;

    const shop = await Shopping.findByPk(request.body.shopping_id);
    if(shop.end_date !== null){
      return response.status(401).json({error:'this shopping has already been completed.'});
    }
    await shop.update(request.body);

    return response.json(shop);
  }
}

export default new DeliveryStatusShopping();