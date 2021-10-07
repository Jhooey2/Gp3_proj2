const router = require("express").Router();
const devRoutes = require("./dev-routes");
const nondevRoutes = require("./nondev-routes");
const jobRoutes = require("./job-routes");
const ratingRoutes = require("./rating-routes");
router.use("/devs", devRoutes);
router.use("/nondevs", nondevRoutes);
router.use("/jobs", jobRoutes);
router.use("/ratings", ratingRoutes);

module.exports = router;
