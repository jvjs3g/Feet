import Mail from '../../lib/Mail';

class OrderMail{
  get key(){
    return 'OrderMail';
  }

  async handle({ data }){

    const {name, email, product, rua, numero, complemento, cep, recebidor } = data;
    
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject:'Entrega a ser feita',
      template:'order',
      context:{
        deliv:name,
        shopping:product,
        recipient:`Endereço: ${rua}, ${numero}, ${complemento}, ${cep}  Entregar para : ${recebidor}`,
      }
    });
  }
}

export default new OrderMail();