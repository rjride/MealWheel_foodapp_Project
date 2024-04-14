const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.use(express.json());
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = "MyNameisRahulIamSoftwareDevloper"

router.post("/CreateUser",
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Instead of closing the connection, send the errors to the client
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt)
    try {
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location
      });
      // Send success response to the client
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      // Send error response to the client
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
router.post("/LoginUser", [
  body('email').isEmail(),
  body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Instead of closing the connection, send the errors to the client
    return res.status(400).json({ errors: errors.array() });
  }
  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "try logging with valid mail" });
    }
    const pwtcompare = await bcrypt.compare(req.body.password, userData.password);
    if (!pwtcompare) {
      return res.status(400).json({ errors: "try logging with valid password" });
    }
    const data = {
      user: {
        id: userData.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken: authToken })
  } catch (error) {
    console.log(error);
    // Send error response to the client
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});
module.exports = router;
