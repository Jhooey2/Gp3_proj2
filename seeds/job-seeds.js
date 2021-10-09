const { Job } = require("../models");

const jobData = [
  {
    title: "Gig 1",
    description: "This is the first gig description on the blog.",
    poster_id: 1,
    bidder_id: 2,
    rating: 2,
  },
  {
    title: "Gig 2",
    description: "This is the second gig description on the blog.",
    poster_id: 2,
    bidder_id: 3,
    rating: 3,
  },
  {
    title: "Gig 3",
    description: "This is the third gig description on the blog.",
    poster_id: 3,
    bidder_id: 1,
    rating: 5,
  },
];

const seedJobs = () => Job.bulkCreate(jobData);

module.exports = seedJobs;
