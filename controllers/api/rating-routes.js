const router = require("express").Router();
const { Rating } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Rating.findAll({})
    .then((dbRatingData) => res.json(dbRatingData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Rating.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRatingData) => res.json(dbRatingData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Rating.create({
      rating_text: req.body.rating_text,
      job_id: req.body.job_id,
      nondev_id: req.session.nondev_id,
    })
      .then((dbRatingData) => res.json(dbRatingData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put("/:id", withAuth, (req, res) => {
  Rating.update(
    {
      rating_text: req.body.rating_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbRatingData) => {
      if (!dbRatingData) {
        res.status(404).json({ message: "No rating with this ID" });
        return;
      }
      res.json(dbRatingData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Rating.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRatingData) => {
      if (!dbRatingData) {
        res.status(404).json({ message: "No rating with this ID" });
        return;
      }
      res.json(dbRatingData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
