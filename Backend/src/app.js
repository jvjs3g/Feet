import express from 'express';
import 'express-async-errors';
import routes from './routes';
import Youch from 'youch';
import path from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';



import './database';

class App{

  constructor(){
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares(){
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use('/files',express.static(path.resolve(__dirname,'..','tmp','uploads')));
  }

  routes(){
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler(){
    this.server.use(async (err, request,response,next) =>{
      const erros = await new Youch(err,request).toJSON();

      return response.status(500).json(erros);
    })
  }
}

export default new App().server;