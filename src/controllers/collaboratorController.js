const collaboratorQueries = require("../db/queries.collaborators");
const User = require("../db/models").User;
const Wiki = require("../db/models").Wiki;
//const Authorizer = require("../policies/application");
const wikiQueries = require("../db/queries.wikis");

module.exports = {
    show(req, res, next){
      console.log('id: ', req.params.wikiId);
      collaboratorQueries.getCollaborators(req.params.wikiId, (err, wiki, collaborators) => {
        console.log('collaborators: ', collaborators);
        if(err || !req.params.wikiId){
          console.log('ERROR', err);
          res.redirect(404, '/');
        } else {
          console.log('rendering...');
          res.render("collaborators/show", {wiki, collaborators});
        }
      });



      // let collaborators;
      //   wikiQueries.getWiki(req.params.id, (err, wiki) => {
      //     console.log
      //       //wiki = result["wiki"];
      //       collaborators = wiki.collaborators;
      
      //       if(err || !wiki) {
      //         res.redirect(404, "/");
      //       } else {
      //         const authorized = new Authorizer(req.user, wiki, collaborators).edit();
      //         if(authorized) {
      //           res.render("collaborators/show", {wiki, collaborators});
      //         } else {
      //           req.flash("notice", "You are not authorized to do that");
      //           res.redirect(`/wikis/${req.params.id}`)
      //         }
      //       }
      //     });
    },
    add(req, res, next){
        collaboratorQueries.createCollaborator(req, (err, collaborator) => {
            if (err) {
                //req.flash("error", err);
                req.flash("notice", "User already exists")
            }
            res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
        });
    },
    remove(req, res, next){
        if(req.user) {
            collaboratorQueries.deleteCollaborator(req, (err, collaborator) => {
              if(err) {
                req.flash("error", err)
              }
              res.redirect(req.headers.referer);
            });
          } else {
            req.flash("notice", "You must be signed in to do that");
            res.redirect(req.headers.referer);
          }
    }
};