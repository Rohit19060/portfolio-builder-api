const TemplateService = {
  hasUserWithUserName(db, user_id) {
    return db("portfolio_data")
      .where({ user_id })
      .first()
      .then((user) => !!user);
  },
  insertData(db, formData) {
    return db
      .insert(formData)
      .into("portfolio_data")
      .returning("*")
      .then(([data]) => data);
  },
  updateData(db, formData) {
    console.log(formData);
    return db("portfolio_data")
      .where({ user_id: formData.user_id })
      .update(formData);
  },
  getUserFromId(db, user_id) {
    return db("portfolio_data").where({ user_id }).first();
  },
};

module.exports = TemplateService;
