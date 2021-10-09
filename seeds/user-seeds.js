const { User } = require("../models");

const userData = [
  {
    firstname: "Dave",
    lastname: "Seeder",
    username: "daveseed",
    email: "ds@email.com",
    developer: true,
    password: "test1111",
  },
  {
    firstname: "Amy",
    lastname: "Leeder",
    username: "amyleed",
    email: "al@email.com",
    developer: true,
    password: "test2222",
  },
  {
    firstname: "Omar",
    lastname: "Reeder",
    username: "omarreed",
    email: "or@email.com",
    developer: false,
    password: "test3333",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
