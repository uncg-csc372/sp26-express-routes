import { Router } from "express";
import passport from "passport";
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
const router = Router();

// Render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle the login form submission
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/auth/login",
  keepSessionInfo: true
}), (req, res) => {
  // Passport has already logged the user in!
  const redirectTo = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectTo);
});


router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

// Show Register Page
router.get("/register", (req, res) => {
  res.render("register"); // Create a register.ejs file
});

// Handle Register Logic
router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, displayName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = [
      firstName,
      lastName,
      email,
      hashedPassword // Save the HASH, not the plain text!
    ];

    await userModel.createNewUser(newUser);

    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.redirect("/auth/register");
  }
});

export default router;
