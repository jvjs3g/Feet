import Mail from '../../lib/Mail';

class OrderMail{
  get key(){
    return 'OrderMail'
  }


  async handle({data}){
    const { shopping } = data;

    await Mail.sendMail({
      to:`${shopping.deliv.name}< ${shopping.deliv.email}>`,
      subject:'serviço a ser prestado',
      template:'Order',
      context:{
        recipient:shopping.recipient.name,
        shopping:shopping.product,
      }
    });
  }
}
export default new OrderMail();