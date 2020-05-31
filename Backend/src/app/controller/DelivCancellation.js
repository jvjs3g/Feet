import { parseISO} from 'date-fns';
import Shopping from '../models/Shopping';
import DelivProblem from '../models/DelivProblem';
import Deliv from '../models/Deliv';
import Recipient from '../models/Recipient';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';


class DelivCancellation{
  async update(request,response){

    const idProblem = request.params.id;


    const problem  = await DelivProblem.findByPk(idProblem);

    const { delivery_id ,description:problema } = problem;
    const shopping = await Shopping.findByPk(delivery_id);
    const {name:recebidor, rua, numero, complemento, cep} = await Recipient.findByPk(shopping.recipient_id);
    const { product } = shopping;
    const {name, email} = await Deliv.findByPk(shopping.deliv_id);


    shopping.canceled_at = new Date();
    const { canceled_at:canceled } = shopping;

    shopping.save();
    const { canceled_at:date } = shopping;  
    
    await Queue.add(CancellationMail.key,{
      problema,
      product,
      recebidor,
      rua,
      numero,
      complemento,
      cep,
      name,
      email,
      date
    }); 
    
    return response.json(shopping);
  }
}

export default new DelivCancellation();