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
      recipient_id:Yup.number(),
      deliv_id:Yup.number(),
      signature_id:Yup.number(),
      product:Yup.string(),
      canceled_at:Yup.date(),
      start_date:Yup.date(),
      end_date:Yup.date(),
    });

    const user_id = request.userId;
    const { name, email } = await Deliv.findByPk(request.body.deliv_id);
    const { name:recebidor ,  rua , numero , complemento, cep } = await Recipient.findByPk(request.body.recipient_id);
    

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'});
    }

    const { recipient_id, deliv_id, signature_id, product, canceled_at, start_date ,end_date } = request.body;
    
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
  


    const shoppoing = await Shopping.create({
      recipient_id,
      deliv_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
      user_id
    });

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

  async index(request,response){
    const { page = 1 } = request.query;

    const shopping = await Shopping.findAll({
      order:['createdAt'],
      limit:20,
      offset:[page - 1] * 20,
    });

    return response.json(shopping);
  }

  async update(request,response){
    
    const schema = Yup.object().shape({
      recipient_id:Yup.number(),
      deliv_id:Yup.number(),
      signature_id:Yup.number(),
      product:Yup.string(),
      canceled_at:Yup.date(),
      start_date:Yup.date(),
      end_date:Yup.date(),
    });


    const shopping = await Shopping.findByPk(request.params.id);

    if(shopping == null){
      return response.status(401).json('Sorry, Shopping not found.')
    }

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({error:'Validation fails'});
    }

    const shop = await shopping.update(request.body);

    return response.json(shop);
  }

  async delete(request,response){
    const user_id = request.userId;

    const shopping = await Shopping.findByPk(request.params.id);
    
    if(shopping == null){
      return response.status(401).json('Sorry, Shopping not found.')
    }

    if(user_id != shopping.user_id){
      return response.status(401).json({
        error:"You don't have permission to cancel this Shopping."
      });
    }
    
    await shopping.destroy();
    return response.json(shopping);
  }

}
export default new ShoppingController();