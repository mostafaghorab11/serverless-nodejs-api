const { eq, desc } = require("drizzle-orm");

const schemas = require("./schemas");
const clients = require("./clients");

async function addLead({ email }) {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .insert(schemas.LeadTable)
    .values({ email: email })
    .returning();

  if (result.length === 1) {
    return result[0];
  }

  return result;
}

async function getLeads() {
  const db = await clients.getDrizzleDbClient();
  const results = await db
    .select()
    .from(schemas.LeadTable)
    .orderBy(desc(schemas.LeadTable.createdAt))
    .limit(10);
  return results;
}

async function getLeadById(id) {
  const db = await clients.getDrizzleDbClient();
  const result = await db
    .select()
    .from(schemas.LeadTable)
    .where(eq(schemas.LeadTable.id, id));

  if (result.length === 1) {
    return result[0];
  }

  return null;
}

module.exports.addLead = addLead;
module.exports.getLeads = getLeads;
module.exports.getLeadById = getLeadById;