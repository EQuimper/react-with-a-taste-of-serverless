import { call, success, failure } from '../libs';

export const main = async (e, ctx, cb) => {
  const data = JSON.parse(e.body);
  const params = {
    TableName: 'notes',
    Key: {
      userId: e.requestContext.authorizer.claims.sub,
      noteId: e.pathParameters.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment ? data.attachment : null,
      ':content': data.content ? data.content : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await call('update', params);
    return cb(null, success({ status: true }));
  } catch (err) {
    return cb(null, failure({ status: false }));
  }
};
