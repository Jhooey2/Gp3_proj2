const router = require("express").Router();
const sequelize = require("../config/connection");
const { Job, Rating, Bid, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Job.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "description", "created_at"],
    include: [
      {
        model: Rating,
        attributes: ["id", "rating_text", "job_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Bid,
        attributes: ["id", "quote", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbJobData) => {
      const jobs = dbJobData.map((job) => job.get({ plain: true }));
      res.render("dashboard", { jobs, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/", withAuth, (req, res) => {
//   Job.findAll({
//     where: {
//       dev_id: req.session.dev_id,
//     },
//     attributes: ["id", "title", "description", "created_at"],
//     include: [
//       {
//         model: Bid,
//         attributes: ["id", "quote", "job_id", "dev_id", "created_at"],
//         include: {
//           model: Dev,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: NonDev,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbJobData) => {
//       const jobs = dbJobData.map((job) => job.get({ plain: true }));
//       res.render("dashboard", { jobs, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/edit/:id", withAuth, (req, res) => {
  Job.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Rating,
        attributes: ["id", "rating_text", "job_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: Bid,
        attributes: ["id", "quote", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbJobData) => {
      if (!dbJobData) {
        res.status(404).json({ message: "No job with this ID" });
        return;
      }

      const job = dbJobData.get({ plain: true });
      res.render("edit-job", { job, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/new", (req, res) => {
  res.render("new-job");
});

// router.get("/edit/:id", withAuth, (req, res) => {
//   Job.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "description", "created_at"],
//     include: [
//       {
//         model: Dev,
//         attributes: ["username"],
//       },
//       {
//         model: Bid,
//         attributes: ["id", "quote", "job_id", "dev_id", "created_at"],
//         include: {
//           model: NonDev,
//           attributes: ["username"],
//         },
//       },
//     ],
//   })
//     .then((dbJobData) => {
//       if (!dbJobData) {
//         res.status(404).json({ message: "No job with this ID" });
//         return;
//       }

//       const job = dbJobData.get({ plain: true });
//       res.render("edit-job", { job, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/new", (req, res) => {
  res.render("new-job");
});

module.exports = router;
