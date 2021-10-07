const router = require("express").Router();
const sequelize = require("../config/connection");
const { Dev, NonDev, Job, Rating } = require("../models");
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
        attributes: ["id", "rating_text", "job_id", "nondev_id", "created_at"],
        include: {
          model: NonDev,
          attributes: ["username"],
        },
      },
      {
        model: Dev,
        attributes: ["username"],
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

router.get("/edit/:id", withAuth, (req, res) => {
  Job.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description", "created_at"],
    include: [
      {
        model: NonDev,
        attributes: ["username"],
      },
      {
        model: Rating,
        attributes: ["id", "rating_text", "job_id", "nondev_id", "created_at"],
        include: {
          model: Dev,
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

module.exports = router;
