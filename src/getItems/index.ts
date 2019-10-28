import * as AWS from 'aws-sdk';

exports.handler = async () => {
  // Use dynamodb to get items from the Item table
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params: any = {
    TableName: process.env.TABLE_NAME
  };

  let allItems = [];

  try {
    console.log(`Getting data from table ${process.env.TABLE_NAME}.`);
    const items: any = await dynamodb.scan(params).promise(); // get items from DynamoDB
    items.Items.forEach((item: any) => allItems.push(item)); // put contents in an array for easier parsing
    allItems.forEach(item => console.log(`Item ${item.id}: ${item.content}\n`)); // log the contents
  } catch (error) {
    console.log(`Error getting data from table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
    throw new Error(error); // stop execution if data from dynamodb not available
  }

  // Return a 200 response if no errors
  const response: object = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: `${allItems.length} items found`
  };

  return response;
};
