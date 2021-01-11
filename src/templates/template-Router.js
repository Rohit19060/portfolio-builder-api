const express = require("express");
const path = require("path");
const bodyParser = express.json();
const fs = require("fs");
const templateRouter = express.Router();
const { verifyJwt } = require("../auth/auth-service");
const {
  hasUserWithUserName,
  insertdata,
  getuserfromid,
} = require("./template-service");

templateRouter.route("/").get(bodyParser, (req, res, next) => {
  let id = verifyJwt(req.query.token).user_id;
  let db = req.app.get("db");

  hasUserWithUserName(db, id).then((user) => {
    if (!user) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("Form");
      return res.end();
    } else {
      getuserfromid(db, id).then((user) => {
        // Editing templates to get the user data
        fs.readFile(
          path.resolve(__dirname, "public", `Template${req.query.id}.html`),
          (err, data) => {
            if (err) throw err;
            var rawdata = data
              .toString()
              .replace("\r", " ")
              .replace("\n", " ")
              .split(" ");
            var newdata = [];
            rawdata.forEach((element) => {
              if (element == "{{Name}}") {
                element = user.name;
              }
              if (element == "{{Projects}}") {
                element = user.projects;
              }
              if (element == "{{Organization}}") {
                element = user.organization;
              }
              newdata.push(element);
            });
            var newdataSend = newdata.join(" ");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(newdataSend);
            return res.end();
          }
        );
      });
    }
  });
});

templateRouter.route("/data").post(bodyParser, (req, res, next) => {
  // Inserting templates data from form
  const { name, projects, organization, token } = req.body;
  let user_id = verifyJwt(token).user_id;
  const formdata = {
    name,
    projects: Array(projects),
    organization: Array(organization),
    user_id,
  };
  for (const [key, value] of Object.entries(formdata)) {
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });
  }
  return insertdata(req.app.get("db"), formdata).then((data) => {
    res.status(200);
  });
});

templateRouter.route("/count").get(bodyParser, (req, res, next) => {
  const dir = "./src/templates/public";
  fs.readdir(dir, (err, files) => {
    res.json({
      count: files.length - 1,
    });
  });
});

module.exports = templateRouter;
