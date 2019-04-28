require("dotenv");
const userQueries = require("../db/queries.users.js");
const passport = require("passport");
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//console.log('key', process.env.SENDGRID_API_KEY);
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

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
      text: ":)",
      html:
        "<p>Have fun creating unlimited public wikis in Markdown or plain text. <br /><strong>@lindscatspencer</strong></p>"
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
    });

    sgMail.send(msg).catch(err => {
      console.log(err);
    });
  },
  signInForm(req, res, next) {
    res.render("users/signin");
  },
  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function() {
      console.log(req.user);
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
  },
  show(req, res, next) {
    //console.log('getting user...')
    userQueries.getUser(req.params.id, (err, user) => {
      //console.log('query returned ', user);
      if (err || user === undefined) {
        req.flash("notice", "No user found with that ID.");
        res.redirect("/");
      } else {
        res.render("users/show", {user});
      }
    });
  },
  upgradeForm(req, res, next) {
    res.render("users/upgradeForm");
  },
  downgradeForm(req, res, next) {
    res.render("users/downgradeForm");
  },
  upgrade(req, res, next) {
    userQueries.getUser(req.params.id, (err, user) => {
      stripe.customers.create({
        email: req.body.stripeEmail,
    }).then((customer) => {
      return stripe.customers.createSource(customer.id, {source: req.body.stripeToken})
    }).then((source) => {
      return stripe.charges.create({
        amount: 1500,
        currency: "USD",
        description: "Upgrade to Premium Membership",
        customer: source.customer
      });
    }).then((charge) => {
      if(charge) {
        let action = "upgrade";
        userQueries.toggleRole(user, action);
        req.flash("notice", "Congrats, you are now a Premium Member!");
        res.redirect("/");
      } else {
        req.flash("notice", "Somethings happened, the upgrade was unsuccessful");
        res.redirect("/users/show", {user})
      }
    })
    .catch(err => {
      console.log(err);
    })
    })
    
  },
  downgrade(req, res, next) {
    userQueries.getUser(req.params.id, (err, user) => {
      if(user) {
        let action ="downgrade"
        userQueries.toggleRole(user, action);
        //wikiQueries.makePublic(user);
        req.flash("notice", "You are now a Standard Member");
        res.redirect("/");
      } else {
        req.flash("notice", "Oops! The downgrade was unsuccessful");
        res.redirect("/users/show", {user})
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
};
