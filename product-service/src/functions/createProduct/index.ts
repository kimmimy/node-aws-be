import { handlerPath } from '../../libs/handlerResolver';

const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
      }
    }
  ]
}


export default createProduct;
