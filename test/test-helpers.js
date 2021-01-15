const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
      portfolio_users,
      portfolio_data
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE portfolio_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('portfolio_users_id_seq', 0)`),
        ])
      )
  );
}

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 2,
      user_name: "test-user-2",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 3,
      user_name: "test-user-3",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
    {
      id: 4,
      user_name: "test-user-4",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z",
    },
  ];
}
function makeTemplateArray(users) {
  return [
    {
      user_id: users[0].id,
      name: "test-user-1",
      projects: "projects",
      organization: "organization",
      portfolio_created: "2029-01-22T16:28:32.615Z",
    },
    {
      user_id: users[1].id,
      name: "test-user-2",
      projects: "projects",
      organization: "organization",
      portfolio_created: "2029-01-22T16:28:32.615Z",
    },
    {
      user_id: users[2].id,
      name: "test-user-3",
      projects: "projects",
      organization: "organization",
      portfolio_created: "2029-01-22T16:28:32.615Z",
    },
    {
      user_id: users[3].id,
      name: "test-user-4",
      projects: "projects",
      organization: "organization",
      portfolio_created: "2029-01-22T16:28:32.615Z",
    },
  ];
}
function makeThingsFixtures() {
  const testUsers = makeUsersArray();
  const testTempData = makeTemplateArray(testUsers);
  return {
    testUsers,
    testTempData,
  };
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("portfolio_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('portfolio_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}
module.exports = {
  cleanTables,
  makeThingsFixtures,
  seedUsers,
};
