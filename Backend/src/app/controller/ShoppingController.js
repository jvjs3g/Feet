import * as Yup from 'yup';
import Shopping from '../models/Shopping';

class ShoppingController{
  async store(request,response){


    return response.json();
  }
}
export default new ShoppingController();