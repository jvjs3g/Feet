import Mail from '../../lib/Mail';

class CancellationMail{
  get key(){
    return 'CancellationMail';
  }

  async handle({data}){
    const { name, email, product, rua, numero, complemento, cep, recebidor, problema} = data;
    await Mail.sendMail({
      to:`${name} <${email}>`,
      subject:'Cancelamento de entrega',
      template:'shopping',
      context:{
        deliv:name,
        shopping:product,
        recipient:`Endereço: ${rua}, ${numero}, ${complemento}, ${cep}  Entregar para : ${recebidor}`,
        problem:problema,
      }
    });
  }
} 
export default new CancellationMail();