/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment } from './environments/environment';
const request = require('request');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    handler: (req, h) => {
      const { symbol, period } = req.params;
      const apiKey = req.url.searchParams.get('token');
      const urlString =
        environment.apiUrl +
        symbol +
        '/chart/' +
        period +
        '?token=' +
        apiKey;
      return new Promise((resolve) => {
      const data = cache.get(urlString);
        if (data) {
          console.log('Obtained data from cache:', data);
          resolve (data);
        }
        else {
          request(urlString, (error, response, body) => {
             console.log('--------------success');   
               cache.set(urlString, body);
               resolve(body);
           });
          }
    });        
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
