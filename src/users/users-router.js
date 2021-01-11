const express = require("express");
const path = require("path");
const usersRouter = express.Router();
const bodyParser = express.json();
const UsersService = require("./users-service");

usersRouter.route("/").post(bodyParser, (req, res, next) => {
  const { password, user_name } = req.body;
  for (const field of ["user_name", "password"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`,
      });

  const passwordError = UsersService.validatePassword(password);

  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }

  UsersService.hasName(req.app.get("db"), user_name)
    .then((user) => {
      if (user) {
        return res.status(400).json({ error: "Username already taken" });
      }

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          user_name,
          password: hashedPassword,
          date_created: "now()",
        };

        return UsersService.insertUser(req.app.get("db"), newUser).then(
          (user) => {
            res.status(201).json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
