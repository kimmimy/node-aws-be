import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse, formatJSONError } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { addProduct } from '@db/databaseService';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<any> = async (event: any) => {
  try {
    console.log('Event', JSON.stringify(event));

    const { title, description, price, count } = event.body;

    if (title && description && price && count) {
      const product = await addProduct(event.body);

      console.log('Product was created:: ', JSON.stringify(product));

      return formatJSONResponse({
        data: product
      }, 201);
    } else {
      return formatJSONResponse({
        data: `Validation Error:: ${JSON.stringify(event.body)}`
      }, 400);
    }
  } catch (error) {
    console.log('Error::', error);

    formatJSONError(error || "something went wrong", 404);
  }
}

export const main = middyfy(createProduct);
