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
    await call('delete', params);
    return cb(null, success({ status: true }));
  } catch (err) {
    return cb(null, failure({ status: false }));
  }
};
