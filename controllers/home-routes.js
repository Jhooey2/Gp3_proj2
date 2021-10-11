const sequelize = require("../config/connection");
const { Job, User, Bid } = require("../models");
const router = require("express").Router();

router.get("/", (req, res) => {
  Job.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "poster_id",
      "bidder_id",
      "created_at",
      "rating",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      // {
      //   model: Bid,
      //   attributes: ["id", "quote", "job_id", "user_id", "created_at"],
      //   include: {
      //     model: User,
      //     attributes: ["username"],
      //   },
      // },
      // {
      //   model: User,
      //   attributes: ["username"],
      // },
    ],
  })
    .then((dbJobData) => {
      const jobs = dbJobData.map((job) => job.get({ plain: true }));
      res.render("homepage", { jobs, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/job/:id", (req, res) => {
  Job.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "description",
      "poster_id",
      "bidder_id",
      "created_at",
      "rating",
    ],
    include: [
      // {
      //   model: Rating,
      //   attributes: ["id", "rating_text", "job_id", "created_at"],
      //   include: {
      //     model: User,
      //     attributes: ["username"],
      //   },
      // },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbJobData) => {
      if (!dbJobData) {
        res.status(404).json({ message: "No job with this ID" });
        return;
      }
      const job = dbJobData.get({ plain: true });
      console.log(job);
      res.render("single-job", { job, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/jobs-ratings", (req, res) => {
//   Job.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "description", "title", "created_at"],
//     include: [
//       {
//         model: Rating,
//         attributes: ["id", "rating_text", "job_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbJobData) => {
//       if (!dbJobData) {
//         res.status(404).json({ message: "No job with this ID" });
//         return;
//       }
//       const job = dbJobData.get({ plain: true });

//       res.render("jobs-ratings", { job, loggedIn: req.session.loggedIn });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/jobs-bids", (req, res) => {
  Job.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "description",
      "poster_id",
      "bidder_id",
      "created_at",
      "rating",
    ],
    include: [
      {
        model: Bid,
        attributes: ["id", "quote", "job_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbJobData) => {
      if (!dbJobData) {
        res.status(404).json({ message: "No job with this ID" });
        return;
      }
      const job = dbJobData.get({ plain: true });

      res.render("jobs-bids", { job, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
