import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import model from '../models/userModel.js';

passport.use(new LocalStrategy({
  usernameField: 'email', // uses 'email' instead of 'username' from the form
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await model.getOneUserByEmail(email);
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    // Compare hashed password from DB with plain text from form
    const isMatch = await compare(password, user.hashedpassword);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await model.getOneUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
