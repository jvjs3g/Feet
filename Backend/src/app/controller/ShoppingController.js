import * as Yup from 'yup';
import {startOfHour , parseISO , isBefore, isAfter } from 'date-fns';
import Shopping from '../models/Shopping';
import Queue from '../../lib/Queue';
import Deliv from '../models/Deliv';
import Recipient from '../models/Recipient';
import OrderMail from '../jobs/OrderMail';

class ShoppingController{
  async store(request,response){

    const schema = Yup.object().shape({
      recipient_id:Yup.number().required(),
      deliv_id:Yup.number().required(),
      signature_id:Yup.number(),
      product:Yup.string().required(),
      canceled_at:Yup.date(),
      start_date:Yup.date(),
      end_date:Yup.date(),
    });


    const { name, email } = await Deliv.findByPk(request.body.deliv_id);
    const { name:recebidor ,  rua , numero , complemento, cep } = await Recipient.findByPk(request.body.recipient_id);
    const { product } = request.body;

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


    const data = start_date.split('T');
    const horaNotFormated = data[1].split('-');
    const hora = horaNotFormated[0]

    if(hora < '08:00:00' || hora >= '18:00:00'){
      return response.status(400).json({error:'time not allowed for withdrawals'});
    }
  


    const shoppoing = await Shopping.create(request.body);

    await Queue.add(OrderMail.key,{
      name,
      email,
      product,
      rua,
      numero,
      complemento,
      cep,
      recebidor
    })

    return response.json(shoppoing);
  }

  
}
export default new ShoppingController();