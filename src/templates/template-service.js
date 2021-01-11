const TemplateService = {
  hasUserWithUserName(db, user_id) {
    return db("portfolio_data")
      .where({ user_id })
      .first()
      .then((user) => !!user);
  },
  insertdata(db, formdata) {
    return db
      .insert(formdata)
      .into("portfolio_data")
      .returning("*")
      .then(([data]) => data);
  },
  getuserfromid(db, user_id) {
    return db("portfolio_data").where({ user_id }).first();
  },
};

module.exports = TemplateService;
