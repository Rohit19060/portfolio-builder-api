const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Users Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
});
