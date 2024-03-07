const { putDatabaseUrl } = require("../lib/secrets");

// tsx src/cli/putSecrets.js <stage> <dbUrl>
require("dotenv").config();

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log("Usage: tsx src/cli/putSecrets.js <stage> <dbUrl>");
  process.exit(1);
}

if (require.main === module) {
  console.log("Updating Database URL");
  const [stage, dbUrl] = args;
  putDatabaseUrl(stage, dbUrl)
    .then((val) => {
      console.log(val);
      console.log(`Secret set`);
      process.exit(0);
    })
    .catch((err) => {
      console.log(`Secret not set ${err}`);
      process.exit(1);
    });
}
