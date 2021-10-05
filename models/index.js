const Dev = require("./Dev");
const NonDev = require("./NonDev");
const Job = require("./Job");
const Rating = require("./Rating");
const Bid = require("./Bid");

// Establishing model connections

NonDev.hasMany(Job, {
  foreignKey: "nondev_id",
});

NonDev.hasMany(Rating, {
  foreignKey: "nondev_id",
  onDelete: "CASCADE",
});

Dev.hasMany(Job, {
  foreignKey: "dev_id",
});

Dev.hasMany(Rating, {
  foreignKey: "dev_id",
  onDelete: "CASCADE",
});

Dev.hasMany(Bid, {
    foreignKey: "bid_id",
})

Job.belongsTo(NonDev, {
  foreignKey: "nondev_id",
  onDelete: "CASCADE",
});

Job.hasMany(Dev, {
    foreignKey: "dev_id",
  });

Job.hasMany(Bid, {
  foreignKey: "job_id",
});

Rating.belongsTo(Dev, {
  foreignKey: "rating",
  onDelete: "CASCADE",
});

Rating.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "CASCADE",
});

module.exports = { Bid, Dev, NonDev, Job, Rating };
