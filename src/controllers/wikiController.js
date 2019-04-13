const wikiQueries = require("../db/queries.wikis.js");

module.exports = {
    new(req, res, next){
        res.render("wikis/new");
    },
    create(req, res, next){
        console.log('ready to create...');
        //making all public wikis for now
        const newWiki = {
            title: req.body.title,
            body: req.body.body,
            private: false,
            userId: req.user.id
        };
        wikiQueries.addWiki(newWiki, (err, wiki) => {
            if(err){
                res.redirect(500, "wikis/new");
            } else {
                //res.redirect(303, `/wikis/${wiki.id}`);
                //for testing purposes...
                console.log(wiki);
                res.redirect('/');
            }
        });
    }
}