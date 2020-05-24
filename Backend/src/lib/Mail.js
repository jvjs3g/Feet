import nodemailer from 'nodemailer';
import { resolve } from 'path'
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import configEmail from '../config/mail';

class Mail{
  constructor(){
    const { service , auth } = configEmail;
    this.transporter = nodemailer.createTransport({
      service,
      auth,
    });
    this.configureTemplates();
  }

  configureTemplates(){
    const viewPath = resolve(__dirname,'..','app','views','emails');

    this.transporter.use('compile',nodemailerhbs({
      viewEngine:exphbs.create({
        layoutsDir:resolve(viewPath, 'layouts'),
        partialsDir:resolve(viewPath, 'partials'),
        defaultLayout:'default',
        extname:'.hbs',
      }),
      viewPath,
      extname:'.hbs',
    }));
  }

  sendMail(message){
    return this.transporter.sendMail({
      ...configEmail.default,
      ...message,
    });
  }
}

export default new Mail();