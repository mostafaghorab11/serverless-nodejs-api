CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text DEFAULT 'test@test.com' NOT NULL,
	"description" text DEFAULT 'This is my comment',
	"createdAt" timestamp DEFAULT (now())
);
