const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Ruta para iniciar sesión
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email.toString() });
      const secret = process.env.secret;
      if (!user) {
        return res.status(400).send("The user not found");
      }

      if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
          {
            userId: user.id,
            isAdmin: user.isAdmin,
          },
          secret,
          { expiresIn: "1d" }  // Para pruebas, es mejor usar un tiempo más corto
        );

        return res.status(200).send({ user: user.email, token: token });
      } else {
        return res.status(400).send("Password is wrong!");
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  },
);

module.exports = router;