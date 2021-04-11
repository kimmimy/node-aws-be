import { formatJSONResponse, parseJsonArray, formatJSONError } from '@libs/apiGateway';

import * as products from '@db/products.json';

export const getProductList = async () => {
  try {
    const productList = await parseJsonArray(products);

    return formatJSONResponse({data: productList }, 200);
  } catch (error) {
    return formatJSONError(error || "something went wrong", 404);
  }
};
