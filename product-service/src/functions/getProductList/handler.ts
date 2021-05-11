import { middyfy } from '@libs/lambda';

import {getProductList} from './lambdaFunction';

export const main = middyfy(getProductList);
