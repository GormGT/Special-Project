// imports
const { Router } = require("express");
const controller = require("../controllers/controller");

// router
const router = Router();

// routes
router.get("/", controller.home_get);

router.get("/login", controller.login_get);

router.post("/login", controller.login_post);

router.get("/signup", controller.signup_get);

router.post("/signup", controller.signup_post);

// temp routes
router.get("/audiotest", controller.audiotest_get);

router.get("/classtest", controller.enemyClassTest_get);

// 404
router.use(controller.error404);

module.exports = router;