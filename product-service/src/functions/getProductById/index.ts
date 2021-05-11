import { handlerPath } from "../../libs/handlerResolver";

const getProductById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
      },
      request:{
        parameters:{
          paths:{
            id: true
          }
        }
      }
    }
  ]
}

export default getProductById