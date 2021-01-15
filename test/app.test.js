const expect = require("chai").expect;
const app = require("../src/app");
const supertest = require("supertest");

describe("App", () => {
  it('GET / responds with 200 "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  });
});
