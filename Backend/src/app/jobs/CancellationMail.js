import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail{
  get key(){
    return 'CancellationMail';
  }

  async handle({data}){
    const { name, email, product, rua, numero, complemento, cep, recebidor, problema, date} = data;
    await Mail.sendMail({
      to:`${name} <${email}>`,
      subject:'Cancelamento de entrega',
      template:'shopping',
      context:{
        deliv:name,
        shopping:product,
        recipient:`Endereço: ${rua}, ${numero}, ${complemento}, ${cep}  Entregar para : ${recebidor}`,
        problem:problema,
        date:format(
          parseISO(date),
          "'dia' dd 'de' MMMM', ás 'H:mm'h'",
          {locale:pt}
        ),
      }
    });
  }
} 
export default new CancellationMail();