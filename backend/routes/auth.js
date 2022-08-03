const express = require("express");
const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../models/auth");
const router = express.Router();

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const auth = new Auth({
      email: req.body.email,
      password: hash,
    });

    auth
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Auth created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  Auth.findOne({ email: req.body.email })
    .then((auth) => {
      if (!auth) {
        return res.status.json({
          message: "Auth failed",
        });
      }

      return bcrypt.compare(req.body.password, auth.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      const token = jwt.sign(
        {
          email: auth.email,
          userId: auth._id,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

module.exports = router;
