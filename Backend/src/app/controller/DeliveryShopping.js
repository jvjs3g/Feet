import Shopping from '../models/Shopping'; 

class DeliveryShopping{
  async index(request,response){
    const deliv_id = request.params.id;

    const shopping = await Shopping.findAll({
      where:{
        deliv_id
      }
    });

   return response.json(shopping);
     
  }
}
export default new DeliveryShopping();