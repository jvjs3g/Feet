import Shopping from '../models/Shopping'; 

class DeliveryShoppingController{
  async index(request,response){
    const deliv_id = request.params.id;

    const shopping = await Shopping.findAll({
      where:{
        deliv_id
      }
    });

  if(shopping == 0 ){
    return response.status(401).json({error:'Sorry, no shopping for you to deliver.'})
  }
    
  return response.json(shopping);
     
  }
}
export default new DeliveryShoppingController();