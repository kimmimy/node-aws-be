import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const headers = {
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Credentials": true
};

export const formatJSONResponse = (response: Record<string, any>, statusCode?: number) => {
  return {
    statusCode: statusCode || 404,
    body: JSON.stringify(response),
    headers,
  }
}

export const formatJSONError = (error:string = "something went wrong" , statusCode?: number) => {
  return {
    statusCode: statusCode || 404,
    body: error,
    // headers, TODO:
    isBase64Encoded: false,
  }
}

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> { }

export const parseJson = (json: JSONValue): any =>
  JSON.parse(JSON.stringify(json));

export const parseJsonArray = async (
  data: JSONValue
): Promise<Array<any>> => parseJson(data).default || parseJson(data) || [];
