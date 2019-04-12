const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("routes : users", () => {
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
  describe("POST /User", () => {
    it("should create a new user with valid values and redirect", done => {
        User.create({
            username: "testuser",
            email: "email@email.com",
            password: "qweqwe"
        })
          .then(user => {
            console.log('testing...')
            expect(user).not.toBeNull();
            expect(user.email).toBe("email@email.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

