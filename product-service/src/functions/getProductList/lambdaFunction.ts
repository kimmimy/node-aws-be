import { formatJSONResponse, formatJSONError } from '@libs/apiGateway';

import { getAll } from '@db/databaseService';

export const getProductList = async () => {
  try {
    console.log('Start getting products:: ');

    const products = await getAll();

    console.log('Products:: ', JSON.stringify(products));

    return formatJSONResponse({ data: products }, 200);
  } catch (error) {
    return formatJSONError(error || "something went wrong", 404);
  }
};
