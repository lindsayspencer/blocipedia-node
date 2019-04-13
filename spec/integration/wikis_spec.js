const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;

describe("routes : wikis", () => {
    afterEach(done => {
        sequelize
          .sync({ force: true })
          .then(() => {
            done();
          })
          .catch(err => {
            done();
          });
      });
  describe("POST /wikis/create", () => {
    it("should create a new wiki associated with a user", done => {
        User.create({
            username: "testuser",
            email: "email@email.com",
            password: "qweqwe"
        })
        .then(user => {
        Wiki.create({
            title: "My new wiki page",
            body: "isn't this great?",
            private: false,
            userId: user.id
        });
        })
          .then(wiki => {
            //console.log('testing...')
            expect(wiki.userId).not.toBeNull();
            expect(wiki.title).toBe("My new wiki page");
            expect(wiki.private).toBe(false);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

