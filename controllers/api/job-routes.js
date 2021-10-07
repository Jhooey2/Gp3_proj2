const router = require("express").Router();
const { Job, Dev, NonDev, Rating } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  console.log("======================");
  Job.findAll({
    attributes: ["id", "title", "description", "created_at"],
    order: [["created_at", "DESC"]],
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
    .then((dbJobData) => res.json(dbJobData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/:id", (req, res) => {
  Job.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "description", "title", "created_at"],
    include: [
      {
        model: NonDev,
        attributes: ["username"],
      },
      {
        model: Rating,
        attributes: ["id", "rating_text", "job_id", "user_id", "created_at"],
        include: {
          model: NonDev,
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
      res.json(dbJobData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Job.create({
    title: req.body.title,
    content: req.body.content,
    nondev_id: req.session.nondev_id,
  })
    .then((dbJobData) => res.json(dbJobData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Job.update(
    {
      title: req.body.title,
      descrption: req.body.descrption,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbJobData) => {
      if (!dbJobData) {
        res.status(404).json({ message: "No job with this ID" });
        return;
      }
      res.json(dbJobData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/:id", withAuth, (req, res) => {
  Job.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbJobData) => {
      if (!dbJobData) {
        res.status(404).json({ message: "No job with this ID" });
        return;
      }
      res.json(dbJobData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
