
const https = require('https')

export const request = async (url = "https://jsonplaceholder.typicode.com/todos") =>{
  return new Promise((resolve, reject) => {
    const req = https.request(url, res => {
      console.log('Response statusCode:', res.statusCode);

      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', error => {
      console.error(error);
      console.log('Products request error');
      reject(error);
    });

    req.end();
  });
};


