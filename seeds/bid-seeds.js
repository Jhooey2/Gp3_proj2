const { Bid } = require("../models");

const bidData = [
  {
    quote: 500,
    job_id: 2,
    user_id: 1,
  },
  {
    quote: 900,
    job_id: 3,
    user_id: 2,
  },
  {
    quote: 450,
    job_id: 1,
    user_id: 3,
  },
];

const seedBids = () => Bid.bulkCreate(bidData);

module.exports = seedBids;
