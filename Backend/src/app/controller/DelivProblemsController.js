import DelivProblem from '../models/DelivProblem';

class DelivProblemsController{
  async store(request,response){
    const delivery_id  = request.params.id;
    const { description } = request.body;
    
    const delivProblem = await DelivProblem.create({
      delivery_id,
      description
    });
    return response.json(delivProblem);
  }

  async index(request,response){
    const problems = await DelivProblem.findAll();
    return response.json(problems);
  }
  async show(request,response){
    const id = request.params.id;

    const shopProblem = await DelivProblem.findAll({
      where:{
        delivery_id:id,
      }
    });

    return response.json(shopProblem);
  }
}
export default new DelivProblemsController();