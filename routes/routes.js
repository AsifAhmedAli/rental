const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users_controller.js");

// new REGISTER user Route

router.post("/test-server", users_controller.test);
router.post("/update-contact", users_controller.update_contact);
router.post("/create-contact", users_controller.create_contact);
router.get("/test", users_controller.test1);
module.exports = router;
