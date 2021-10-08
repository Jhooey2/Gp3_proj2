// const router = require("express").Router();
// const { NonDev, Dev, Job, Rating } = require("../../models");
// router.get("/", (req, res) => {
//   NonDev.findAll({
//     attributes: { exclude: ["[password"] },
//   })
//     .then((dbNonDevData) => res.json(dbNonDevData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.get("/:id", (req, res) => {
//   NonDev.findOne({
//     attributes: { exclude: ["password"] },
//     where: {
//       id: req.params.id,
//     },
//     include: [
//       {
//         model: Job,
//         attributes: ["id", "title", "description", "created_at"],
//       },

//       {
//         model: Rating,
//         attributes: ["id", "rating_text", "created_at"],
//         include: {
//           model: Job,
//           attributes: ["title"],
//         },
//       },
//       {
//         model: Job,
//         attributes: ["title"],
//       },
//     ],
//   })
//     .then((dbNonDevData) => {
//       if (!dbNonDevData) {
//         res.status(404).json({ message: "No NonDev with this ID" });
//         return;
//       }
//       res.json(dbNonDevData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.post("/", (req, res) => {
//   NonDev.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   })

//     .then((dbNonDevData) => {
//       req.session.save(() => {
//         req.session.nondev_id = dbNonDevData.id;
//         req.session.username = dbNonDevData.username;
//         req.session.loggedIn = true;

//         res.json(dbNonDevData);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.post("/login", async (req, res) => {
//   try {
//     const dbNonDevData = await NonDev.findOne({
//       where: {
//         username: req.body.username,
//       },
//     });
//     if (!dbNonDevData) {
//       res.status(400).json({ message: "No NonDev that user name!" });
//       return;
//     }

//     const validPassword = dbNonDevData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password!" });
//       return;
//     }
//     req.session.save(() => {
//       req.session.nondev_id = dbNonDevData.id;
//       req.session.username = dbNonDevData.username;
//       req.session.loggedIn = true;

//       res.json({ user: dbNonDevData, message: "You successfully logged in!" });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post("/logout", (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// router.put("/:id", (req, res) => {
//   NonDev.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbNonDevData) => {
//       if (!dbNonDevData[0]) {
//         res.status(404).json({ message: "No NonDev with this ID" });
//         return;
//       }
//       res.json(dbNonDevData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbNonDevData) => {
//       if (!dbNonDevData) {
//         res.status(404).json({ message: "No NonDev with this ID" });
//         return;
//       }
//       res.json(dbNonDevData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// module.exports = router;
