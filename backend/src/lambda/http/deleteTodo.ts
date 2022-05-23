import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteToDo } from '../../businessLogic/ToDo'
// import { getUserId } from '../utils'

// export const handler = middy(
  export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    
    const todoId = event.pathParameters.todoId
    const deleteData = await deleteToDo(todoId, jwtToken);
    // TODO: Remove a TODO item by id
    
    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        deleteData
      })
  }
  }


