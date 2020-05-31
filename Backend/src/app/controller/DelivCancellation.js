import Shopping from '../models/Shopping';
import DelivProblem from '../models/DelivProblem';

class DelivCancellation{
  async delete(request,response){

    const idProblem = request.params.id;


    const problem  = await DelivProblem.findByPk(idProblem);

    const { delivery_id } = problem;
    const delivery = await Shopping.findByPk(delivery_id);

    await problem.destroy();
    

    return response.json(delivery);
  }
}

export default new DelivCancellation();