const Wiki = require("./models").Wiki;
const User = require("./models").User;
const Collaborator = require("./models").Collaborator;

module.exports = {
  addWiki(newWiki, callback) {
    return Wiki.create(newWiki)
      .then(wiki => {
        callback(null, wiki);
      })
      .catch(err => {
        callback(err);
      });
  },
  getWiki(id, callback) {
    //console.log('wiki id: ', id);
    Wiki.findOne(
      {
        where: { id: id }
      },
      { include: [{ model: Collaborator, as: "collaborators" }] }
    )
      .then(wiki => {
        console.log('wiki.collaborators: ', wiki.collaborators);
        callback(null, wiki);
      })
      .catch(err => {
        callback(err);
      });
  },
  getAllWikis(callback) {
    return Wiki.findAll({
      order: [["title", "ASC"]]
    })
      .then(wikis => {
        callback(null, wikis);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteWiki(id, callback) {
    return Wiki.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateWiki(id, updatedWiki, callback) {
    return Wiki.findOne({
      where: { id }
    }).then(wiki => {
      if (!wiki) {
        return callback("Wiki not found");
      }
      wiki
        .update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
        })
        .catch(err => {
          callback(err);
        });
    });
  },
  toPublic(id, callback) {
    return Wiki.findOne({
      where: { id: id }
    })
      .then(wiki => {
        if (!wiki) {
          return callback("Wiki not found");
        }
        wiki.update({
          private: false
        });
        callback(null, wiki);
      })
      .catch(err => {
        callback(err);
      });
  },
  toPrivate(id, callback) {
    return Wiki.findOne({
      where: { id: id }
    })
      .then(wiki => {
        if (!wiki) {
          return callback("Wiki not found");
        }
        wiki.update({
          private: true
        });
        callback(null, wiki);
      })
      .catch(err => {
        callback(err);
      });
  },
  downgrade(userId) {
    return Wiki.findAll({
      where: { userId: userId }
    })
      .then(wikis => {
        wikis.forEach(wiki => {
          wiki.update({
            private: false
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
