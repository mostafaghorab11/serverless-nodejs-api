const {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
} = require("@aws-sdk/client-ssm");

const AWS_REGION = "us-east-1";
const STAGE = process.env.STAGE || "prod";

async function getDatabaseUrl() {
  const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${STAGE}/database-url`;
  const client = new SSMClient({ region: AWS_REGION });
  const paramStoreData = {
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(paramStoreData);
  const result = await client.send(command);
  return result.Parameter.Value;
}

async function putDatabaseUrl(stage, dbUrlValue) {
  const paramStage = stage ? stage : "dev";
  if (paramStage === "prod") {
    return;
  }
  if (!dbUrlValue) {
    return;
  }
  const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${paramStage}/database-url`;
  const client = new SSMClient({ region: AWS_REGION });
  const paramStoreData = {
    Name: DATABASE_URL_SSM_PARAM,
    Value: dbUrlValue,
    Type: "SecureString",
    Overwrite: true,
  };
  const command = new PutParameterCommand(paramStoreData);
  const result = await client.send(command);
  return result;
}

module.exports.getDatabaseUrl = getDatabaseUrl;
module.exports.putDatabaseUrl = putDatabaseUrl;
