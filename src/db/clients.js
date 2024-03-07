const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");

const { getDatabaseUrl } = require("../lib/secrets");

async function getDbClient() {
  const dbUrl = await getDatabaseUrl();
  const sql = neon(dbUrl);
  return sql;
}

async function getDrizzleDbClient() {
  const sql = await getDbClient();
  return drizzle(sql);
}

module.exports.getDbClient = getDbClient;
module.exports.getDrizzleDbClient = getDrizzleDbClient;
