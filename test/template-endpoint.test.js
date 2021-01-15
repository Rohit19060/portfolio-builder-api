const app = require("../src/app");
const supertest = require("supertest");

describe("Template Endpoints", () => {
  it(`Get the total count of templates`, () => {
    return supertest(app)
      .get("/api/templates/count")
      .expect(200, '{"count":9}');
  });
});
