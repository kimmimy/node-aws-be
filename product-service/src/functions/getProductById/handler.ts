import { middyfy } from '@libs/lambda';
import { getProductById } from './lambdaFunction';


export const main = middyfy(getProductById);

