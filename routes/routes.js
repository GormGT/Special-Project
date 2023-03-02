// imports
const { Router } = require("express");
const controller = require("../controllers/controller");

// router
const router = Router();

// routes
router.get("/", controller.home_get);

// temp routes
router.get("/audiotest", controller.audiotest_get);

router.get("/classtest", controller.enemyClassTest_get);

module.exports = router;