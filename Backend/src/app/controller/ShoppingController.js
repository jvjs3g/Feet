import * as Yup from 'yup';
import {startOfHour , parseISO , isBefore } from 'date-fns';
import Shopping from '../models/Shopping';

class ShoppingController{
  async store(request,response){

    const schema = Yup.object().shape({
      recipient_id:Yup.number().required(),
      deliv_id:Yup.number().required(),
      signature_id:Yup.number().required(),
      product:Yup.string().required(),
      canceled_at:Yup.date(),
      start_date:Yup.date(),
      end_date:Yup.date(),
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'});
    }

    const {  canceled_at, start_date ,end_date } = request.body;
    
    const hourCanceled_at = startOfHour(parseISO(canceled_at));

    if(isBefore(hourCanceled_at, new Date())){
      return response.status(400).json({ error:'Past dates are not permitted cenceled.'});
    }

    const hourStart_date = startOfHour(parseISO(start_date));

    if(isBefore(hourStart_date, new Date())){
      return response.status(400).json({ error:'Past dates are not permitted in start date.'});
    }
    

    const shoppoing = await Shopping.create(request.body);

    return response.json(shoppoing);
  }

  
}
export default new ShoppingController();