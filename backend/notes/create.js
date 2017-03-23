import uuid from 'uuid';
import { call, success, failure } from '../libs';

export const main = async (e, ctx, cb) => {
  const data = JSON.parse(e.body);

  const params = {
    TableName: 'notes',
    Item: {
      userId: e.requestContext.authorizer.claims.sub,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  };

  try {
    await call('put', params);
    return cb(null, success(params.Item));
  } catch (err) {
    return cb(null, failure({ status: false }));
  }
};
