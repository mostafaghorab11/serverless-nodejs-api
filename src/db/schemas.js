const { serial, timestamp } = require("drizzle-orm/mysql-core");
const { text, pgTable } = require("drizzle-orm/pg-core");

const LeadTable = pgTable("leads", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").notNull(),
  description: text("description").default("This is my comment"),
  createdAt: timestamp("createdAt").defaultNow(),
});

module.exports.LeadTable = LeadTable;
