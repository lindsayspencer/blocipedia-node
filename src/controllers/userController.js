const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  signUp(req, res, next) {
    res.render("users/signup");
  },
  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.password_conf
    };
    const msg = {
      to: req.body.email,
      from: "lavendarlindsay@gmail.com",
      subject: "Thanks for Joining the Blocipedia Fam!",
      text: "Have fun creating unlimited public wikis in Markdown or plain text."
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
      // using SendGrid's v3 Node.js Library
      // https://github.com/sendgrid/sendgrid-nodejs
      
      // sgMail.send(msg).catch(err => {
      //   console.log(err);
      // });
    });
  }
};
