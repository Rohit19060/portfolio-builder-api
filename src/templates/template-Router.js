const express = require("express");
const path = require("path");
const bodyParser = express.json();
const fs = require("fs");
const templateRouter = express.Router();
const { verifyJwt } = require("../auth/auth-service");
const {
  hasUserWithUserName,
  insertData,
  updateData,
  getUserFromId,
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
      getUserFromId(db, id).then((user) => {
        // Editing templates to get the user data
        fs.readFile(
          path.resolve(__dirname, "public", `Template${req.query.id}.html`),
          (err, data) => {
            if (err) throw err;
            var rawData = data
              .toString()
              .replace("\r", " ")
              .replace("\n", " ")
              .split(" ");
            var newData = [];
            rawData.forEach((element) => {
              if (element == "{{Name}}") {
                element = user.name;
              } else if (element == "{{Projects}}") {
                element = user.projects;
              } else if (element == "{{Organization}}") {
                element = user.organization;
              } else if (element == "{{GitHub}}") {
                element = user.github;
              } else if (element == "{{LinkedIn}}") {
                element = user.linkedin;
              }
              newData.push(element);
            });
            var newDataSend = newData.join(" ");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(newDataSend);
            return res.end();
          }
        );
      });
    }
  });
});

templateRouter.route("/edit").get(bodyParser, (req, res, next) => {
  let id = verifyJwt(req.query.token).user_id;
  let db = req.app.get("db");
  getUserFromId(db, id).then((user) => {
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        error: `User Not Found`,
      });
    }
  });
});

templateRouter.route("/edit").post(bodyParser, (req, res, next) => {
  const { name, projects, organization, github, linkedin, token } = req.body;
  let user_id = verifyJwt(token).user_id;
  const formData = {
    name,
    projects: Array(projects),
    organization: Array(organization),
    github,
    linkedin,
    user_id,
  };
  for (const [key, value] of Object.entries(formData)) {
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });
  }
  return updateData(req.app.get("db"), formData).then((data) => {
    res.status(200).json(data);
  });
});

templateRouter.route("/data").post(bodyParser, (req, res, next) => {
  // Inserting templates data from form
  const { name, projects, organization, github, linkedin, token } = req.body;
  let user_id = verifyJwt(token).user_id;
  const formData = {
    name,
    projects: Array(projects),
    organization: Array(organization),
    github,
    linkedin,
    user_id,
  };
  for (const [key, value] of Object.entries(formData)) {
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });
  }
  return insertData(req.app.get("db"), formData).then((data) => {
    res.status(200);
  });
});

templateRouter.route("/templateData").get(bodyParser, (req, res, next) => {
  const dir = "./src/templates/public";
  fs.readdir(dir, (err, files) => {
    res.json({
      templateData: [
        "This Template is clean and simple with automatic changing background, looks nice ",
        "A good looking Glassmorphism effect, that make your portfolio look like Glass",
        "This Template is for official use nothing fancy about it, just a good shadow",
        "Neumorphism Design portfolio, it's something that will show your Skills",
      ],
    });
  });
});

module.exports = templateRouter;
