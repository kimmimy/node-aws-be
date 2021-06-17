import 'source-map-support/register';

import { middyfy } from '@libs/lambda';


const tokenAuthorizer = async (event, _, callback) => {
  console.log(JSON.stringify(event), 'events')

  if (event.type !== 'TOKEN') {
    console.log(event.type, 'TYPE')
    callback('Unauthorized');
    return;
  }

  try {
    const token = event.authorizationToken;
    const creds = token.split(' ')[1];
    const [username, password] = Buffer.from(creds, 'base64').toString('utf-8').split(':');

    console.log('password', password);
    console.log('username', username);
    const storedPassword = process.env[username];
    console.log('storedPassword', storedPassword);

    // const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow';
    const effect = 'test_password' !== password ? 'Deny' : 'Allow';

    console.log('effect', effect)
    console.log('---------------');
    console.log('creds', creds);
    console.log('event.methodArn', event.methodArn);
    console.log('effect', effect);

    const policy = generatePolicy(creds, event.methodArn, effect);


    console.log(policy, "policy")
    callback(null, policy);
  } catch (err) {
    callback(`Unauthorized: ${err.message || err}`)
  }
}

function generatePolicy (principalId: string, resource: string, effect: string) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}

export const main = middyfy(tokenAuthorizer);