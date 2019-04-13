const Wiki = require('./models').Wiki;
const User = require('./models').User;

module.exports = {
    addWiki(newWiki, callback){
        return Wiki.create(newWiki)
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch(err => {
            callback(err);
        });
    },
    getWiki(id, callback){
        return Wiki.findOne({
            where: { id: id }
        })
        .then(wiki => {
            callback(null, wiki);
        })
        .catch(err => {
            callback(err);
        }) 
    }
}