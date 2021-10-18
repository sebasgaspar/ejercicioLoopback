import {Next} from '@loopback/context';
import {Middleware, MiddlewareContext} from '@loopback/rest';

export const log: Middleware = async (middlewareCtx: MiddlewareContext, next: Next) => {
  const {request} = middlewareCtx;
  console.log('PATH Request: %s', request.path);
  try {
    const result = await next();
    const {response} = middlewareCtx;
    let date: Date = new Date(0), updated: boolean = false;
    if (request.method == 'PUT') {
      updated = true
      date = new Date()
    }
    response.send({
      'data': result,
      'updated': updated,
      'update_at': date
    });
    return result;
  } catch (err) {
    // Catch errors from downstream middleware
    console.error(
      'Error received for %s %s',
      request.method,
      request.originalUrl,
    );
    throw err;
  }
};
