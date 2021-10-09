// const Dev = require("./Dev");
// const NonDev = require("./NonDev");
const User = require("./User");
const Job = require("./Job");
const Rating = require("./Rating");
const Bid = require("./Bid");

// Establishing model connections

User.hasMany(Job, {
  foreignKey: "user_id",
});

User.hasMany(Bid, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Rating, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
})

Job.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Job.hasMany(Bid, {
  foreignKey: "job_id",
  onDelete: "CASCADE",
});

Bid.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Bid.belongsTo(Job, {
  foreignKey: "job_id",
  onDelete: "CASCADE",
});

Rating.belongsTo(Job, {
  foreignKey: "rating",
});

// Rating.belongsTo(User, {
//   foreignKey: "user_id",
// });

Job.hasOne(Rating, {
  foreignKey: "job_id",
});

// NonDev.hasMany(Job, {
//   foreignKey: "nondev_id",
// });

// NonDev.hasMany(Rating, {
//   foreignKey: "nondev_id",
//   onDelete: "CASCADE",
// });

// Dev.hasMany(Job, {
//   foreignKey: "dev_id",
//   onDelete: "CASCADE",
//   constraints: false,
// });

// Dev.hasMany(Rating, {
//   foreignKey: "dev_id",
//   onDelete: "CASCADE",
// });

// Dev.hasMany(Bid, {
//   foreignKey: "bid_id",
// });

// Job.belongsTo(NonDev, {
//   foreignKey: "nondev_id",
//   onDelete: "CASCADE",
// });

// Job.belongsTo(Dev, {
//   foreignKey: "dev_id",
//   constraints: false,
// });

// Rating.belongsTo(Dev, {
//   foreignKey: "rating",
//   onDelete: "CASCADE",
// });

// Bid.belongsTo(Dev, {
//   foreignKey: "dev_id",
// });

module.exports = { Bid, User, Job, Rating };
