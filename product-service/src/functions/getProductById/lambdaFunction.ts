import { formatJSONError, formatJSONResponse } from "@libs/apiGateway";

// import { request } from "src/services/request";

import { getById } from '@db/databaseService';

type Product = {
  title: string;
  id: string;
  description: string,
  price: number
}

export const getProductById = async (event) => {
  try {
    const id = event.id || event.pathParameters ? event.pathParameters.id : null;

    if (!id) {
      return formatJSONResponse({ data: "id wasn't passed" }, 404)
    }

    console.log('Search ID:: ', id);

    // const bitcoin = await request('https://api.coindesk.com/v1/bpi/currentprice.json');
    
    const product = await getById(id);

    console.log('Found product', JSON.stringify(product));

    if (!product) {
      return formatJSONResponse({ data: "product not found" }, 404);
    }
    
    
    return formatJSONResponse(product, 200 );
  } catch (error) {
    console.log('Error:', error);

    return formatJSONError(error, 404);
  }
}
