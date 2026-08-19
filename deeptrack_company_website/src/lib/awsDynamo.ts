import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

function getAwsCredentials() {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS configuration. Set AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY in your environment.",
    );
  }

  return {
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  };
}

export function getDynamoDocumentClient() {
  const awsConfig = getAwsCredentials();
  const client = new DynamoDBClient(awsConfig);
  return DynamoDBDocumentClient.from(client);
}

export function getDynamoTableName() {
  const tableName = process.env.DYNAMODB_TABLE;
  if (!tableName) {
    throw new Error("Missing DYNAMODB_TABLE environment variable.");
  }
  return tableName;
}
