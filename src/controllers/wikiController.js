const wikiQueries = require("../db/queries.wikis.js");
var markdown = require( "markdown" ).markdown;

module.exports = {
    new(req, res, next){
        res.render("wikis/new");
    },
    newPrivate(req, res, next){
        res.render("wikis/newPrivate");
    },
    create(req, res, next){
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
                res.redirect(303, `/wikis/${wiki.id}`);
                //for testing purposes...
                // console.log(wiki);
                // res.redirect('/');
            }
        });
    },
    createPrivate(req, res, next){
        //making all public wikis for now
        const newWiki = {
            title: req.body.title,
            body: req.body.body,
            private: true,
            userId: req.user.id
        };
        wikiQueries.addWiki(newWiki, (err, wiki) => {
            if(err){
                res.redirect(500, "wikis/new");
            } else {
                res.redirect(303, `/wikis/${wiki.id}`);
                //for testing purposes...
                // console.log(wiki);
                // res.redirect('/');
            }
        });
    },
    show(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(err || !wiki){
                res.redirect(404, '/');
            } else {
                wiki.body = markdown.toHTML(wiki.body);
                res.render('wikis/show', { wiki });
            }
        });
    },
    all(req, res, next){
        wikiQueries.getAllWikis((err, wikis) => {
            if(err){
                res.redirect(500, 'static/index');
            } else {
                res.render('wikis/all', { wikis });
            }
        })
    },
    destroy(req, res, next){
        wikiQueries.deleteWiki(req.params.id, (err, deletedRecordsCount) =>{
            if(err){
                res.redirect(500, `/wikis/${req.params.id}`);
            } else {
                res.redirect(303, '/');
            }
        });
    },
    edit(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(err || !wiki) {
                res.redirect(404, '/');
            } else {
                res.render('wikis/edit', { wiki });
            }
        });
    },
    update(req, res, next){
        //const newB
        wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
            if (err || !wiki){
                res.redirect(404, `/wikis/${req.params.id}/edit`);
            } else {
                res.redirect(`/wikis/${req.params.id}`);
            }
        })
    },
    makePublic(req, res, next){
        wikiQueries.toPublic(req.params.id, (err, wiki) => {
            if(err || !wiki){
                res.redirect(404, `/wikis/${req.params.id}`)
            } else {
                res.redirect(`/wikis/${req.params.id}`)
            }
        })
    },
    makePrivate(req,res,next){
        wikiQueries.toPrivate(req.params.id, (err, wiki) => {
            if(err || !wiki){
                res.redirect(404, `/wikis/${req.params.id}`)
            } else {
                res.redirect(`/wikis/${req.params.id}`)
            }
        })
    }
}