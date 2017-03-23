import { call, success, failure } from '../libs';

export const main = async (e, ctx, cb) => {
  const params = {
    TableName: 'notes',
    // Only return notes with the userId
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': e.requestContext.authorizer.claims.sub,
    }
  };

  try {
    const res = await call('query', params);
    return cb(null, success(res.Items));
  } catch (err) {
    return cb(null, failure({ status: false }));
  }
};
