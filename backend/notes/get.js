import { call, success, failure } from '../libs';

export const main = async (e, ctx, cb) => {
  const params = {
    TableName: 'notes',
    Key: {
      userId: e.requestContext.authorizer.claims.sub,
      noteId: e.pathParameters.id
    }
  };

  try {
    const res = await call('get', params);
    if (res.Item) {
      return cb(null, success(res.Item));
    }
    return cb(null, failure({ status: false, error: 'Item not found.' }));
  } catch (err) {
    return cb(null, failure({ status: false }));
  }
};
