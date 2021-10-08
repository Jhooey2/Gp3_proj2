const router = require("express").Router();
const userRoutes = require("./user-routes");
// const nondevRoutes = require("./nondev-routes");
const jobRoutes = require("./job-routes");
const ratingRoutes = require("./rating-routes");
router.use("/users", userRoutes);
// router.use("/nondevs", nondevRoutes);
router.use("/jobs", jobRoutes);
router.use("/ratings", ratingRoutes);

module.exports = router;
