const router = require("express").Router();
const { Bid } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Bid.findAll({})
    .then((dbBidData) => res.json(dbBidData))
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
    .then((dbBidData) => res.json(dbBidData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Bid.create({
      quote: req.body.quote,
      job_id: req.body.job_id,
      user_id: req.session.user_id,
    })
      .then((dbBidData) => res.json(dbBidData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put("/:id", withAuth, (req, res) => {
  Bid.update(
    {
      quote: req.body.quote,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbBidData) => {
      if (!dbBidData) {
        res.status(404).json({ message: "No bid with this ID" });
        return;
      }
      res.json(dbBidData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Bid.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbBidData) => {
      if (!dbBidData) {
        res.status(404).json({ message: "No bid with this ID" });
        return;
      }
      res.json(dbBidData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
