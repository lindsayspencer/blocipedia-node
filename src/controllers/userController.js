const userQueries = require("../db/queries.users.js");
const passport = require("passport");
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      to: newUser.email,
      from: "lavendarlindsay@gmail.com",
      subject: "Thanks for Joining the Blocipedia Fam!",
      text: "Have fun creating unlimited public wikis in Markdown or plain text.",
      html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        })
      }
    });
    
      // sgMail.send(msg)
      //   .catch((err) => {
      //       console.log(err)
      //   });
  },
  signInForm(req, res, next) {
    res.render("users/signin");
  },
  signIn(req, res, next){
    passport.authenticate("local")(req, res, function() {
      if (!req.user) {
        req.flash("notice", "Sign in failed. Please try again.");
        res.redirect("/users/signin");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }
};
