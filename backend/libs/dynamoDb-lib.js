import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

export const call = (action, params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return new Promise((resolve, reject) => {
    dynamoDb[action](params, (err, res) => {
      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  });
};
