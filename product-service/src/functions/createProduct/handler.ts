import { middyfy } from '@libs/lambda';

import { createProduct } from './lambdaFunction';

export const main = middyfy(createProduct);
