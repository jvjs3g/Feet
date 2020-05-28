import ShoppingProblems from '../models/ShoppingProblems';

class ShoppingProblemsController{
  async store(request,response){
    const { description } = request.body;
    const shopping_id = request.params.id;

    
    const shopping = await ShoppingProblems.create({
      shopping_id,
      description
    });
    return response.json(shopping);
  }

  async index(request,response){
    return response.json();
  }

  async show(request,response){
    return response.json();
  }
}

export default new ShoppingProblemsController();