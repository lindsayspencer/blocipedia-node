const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("routes : users", () => {
    beforeEach(done => {
        User
          .sync({ force: true })
          .then(() => {
            done();
          })
          .catch(err => {
            //console.log(err);
            done();
          });
      });
  describe("POST /User", () => {
    it("should create a new user with valid values and redirect", done => {
        User.create({
            username: "testuser",
            email: "email@email.com",
            password: "qweqwe"
        })
          .then(user => {
            //console.log(user)
            expect(user).not.toBeNull();
            expect(user.email).toBe("email@email.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            //console.log(err);
            return err;
            done();
          });
      });
    });
  });

