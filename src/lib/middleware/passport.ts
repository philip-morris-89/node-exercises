import passport from "passport";
import passportGitHub2 from "passport-github2";
import { RequestHandler } from "express";

const githubStrategy = new passportGitHub2.Strategy(
  {
    clientID: "358a3db9af0e863780e2",
    clientSecret: "6817c95fce6bddd8a76f5138db1fe581f3861dcd",
    callbackURL: "http://localhost:3000/auth/github/callback",
  },
  function (
    accessToken: string,
    refreshToken: string,
    profile: { [key: string]: string },
    done: (error: null, user: Express.User) => void
  ) {
    const user: Express.User = {
      username: profile.username,
    };
    done(null, user);
  }
);

passport.use(githubStrategy);

passport.serializeUser<Express.User>((user, done) => done(null, user));

passport.deserializeUser<Express.User>((user, done) => done(null, user));

const checkAuthorization: RequestHandler = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).end();
};

export { passport, checkAuthorization };
