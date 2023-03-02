// imports
const { Router } = require("express");
const controller = require("../controllers/controller");

// router
const router = Router();

// routes
router.get("/", controller.home_get);

// temp routes
router.get("/audiotest", controller.audiotest_get);

// 404
router.use(controller.error404);

module.exports = router;