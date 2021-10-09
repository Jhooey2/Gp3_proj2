const seedUsers = require("./user-seeds");
const seedJobs = require("./job-seeds");
const seedBids = require("./bid-seeds");

const sequelize = require("../config/connection");

// Get info to populate database
const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedJobs();
  await seedBids();
  process.exit(0);
};

seedAll();
