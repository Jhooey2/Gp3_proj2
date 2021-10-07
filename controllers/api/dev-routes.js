const router = require("express").Router();
const { NonDev, Dev, Job, Rating } = require("../../models");

router.get("/", (req, res) => {
  Dev.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((dbDevData) => res.json(dbDevData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Dev.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Job,
        attributes: ["id", "title", "description", "created_at"],
      },

      {
        model: Rating,
        attributes: ["id", "rating_text", "created_at"],
        include: {
          model: Job,
          attributes: ["title"],
        },
      },
      {
        model: Job,
        attributes: ["title"],
      },
    ],
  })
    .then((dbDevData) => {
      if (!dbDevData) {
        res.status(404).json({ message: "No Dev with this ID" });
        return;
      }
      res.json(dbDevData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Dev.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })

    .then((dbDevData) => {
      req.session.save(() => {
        req.session.dev_id = dbDevData.id;
        req.session.username = dbDevData.username;
        req.session.loggedIn = true;

        res.json(dbDevData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    const dbDevData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!dbDevData) {
      res.status(400).json({ message: "No Dev with that name!" });
      return;
    }

    const validPassword = dbDevData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbDevData.id;
      req.session.username = dbDevData.username;
      req.session.loggedIn = true;

      res.json({ user: dbDevData, message: "You successfully logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  Dev.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbDevData) => {
      if (!dbDevData[0]) {
        res.status(404).json({ message: "No Dev with this ID" });
        return;
      }
      res.json(dbDevData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Dev.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDevData) => {
      if (!dbDevData) {
        res.status(404).json({ message: "No Dev with this ID" });
        return;
      }
      res.json(dbDevData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
