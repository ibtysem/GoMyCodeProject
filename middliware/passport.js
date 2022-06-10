const passport = require("passport");
const user = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrToken,
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const userr = await user.findOne({ _id: jwt_payload._id });
      userr ? done(null, userr) : done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
