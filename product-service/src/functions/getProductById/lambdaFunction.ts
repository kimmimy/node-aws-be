import { formatJSONError, formatJSONResponse, parseJsonArray } from "@libs/apiGateway";

import * as products from '@db/products.json';
import { request } from "src/services/request";

type Product = {
  title: string;
  count: number;
  id: string;
  "description": string,
  "amount": number,
  "price": number
}

export const getProductById = async (event) => {
  try {
    const id = event.id || event.pathParameters ? event.pathParameters.id : null;

    if (!id) {
      return formatJSONResponse({ data: "id wasn't passed" }, 404)
    }

    const parsedJSONArray = await parseJsonArray(products);
    
    const bitcoin = await request('https://api.coindesk.com/v1/bpi/currentprice.json');
    
    const product = parsedJSONArray.find((productItem: Product) => productItem.id === id);

    if (!product) {
      return formatJSONResponse({ data: "product not found" }, 404);
    }
    
    const data = {...product,bitcoin} || "product not found"
    
    return formatJSONResponse(data, product ? 200 : 404);
  } catch (error) {
    return formatJSONError(error, 404);
  }
}
