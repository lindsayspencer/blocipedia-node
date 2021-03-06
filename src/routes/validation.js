const User = require("../db/models").User;

module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("username", "cannot be empty").isLength({ min: 2 });
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 6 });
      req
        .checkBody("password_conf", "must match password provided")
        .optional()
        .matches(req.body.password);
    }
    const errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
    // const duplicate = User.findOne({
    //   email: req.body.email
    // });
    // if (errors) {
    //   if (duplicate != null) {
    //     console.log("if duplicate is null..");
    //     console.log(duplicate);
    //     req.flash("email has already been used", errors);
    //     return res.redirect(req.headers.referer);
    //   }
    //   req.flash("error", errors);
    //   return res.redirect(req.headers.referer);
    // } else {
    //   return next();
    // }
  },
  validateWikis(req, res, next){
    if(req.method === "POST"){
      req.checkBody("title", "must be at least 5 characters in length").isLength({ min: 5 });
    }
    const errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
};
