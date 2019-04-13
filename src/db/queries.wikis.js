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
    },
    deleteWiki(id, callback){
        return Wiki.destroy({
            where: { id }
        })
        .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
        })
        .catch(err => {
            callback(err);
        });
    }
}