import { handlerPath } from '../../libs/handlerResolver';

const getProductList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
      }
    }
  ]
}


export default getProductList;
