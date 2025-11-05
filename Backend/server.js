const express = require("express");
const app = express();
const port= process.env.PORT || 8080;
const path = require("path");
const mongoose = require('mongoose');
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");


const { Post, User } = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync"); 
const { isLoggedIn } = require("./utils/middleware");
const dashboardRoute = require("./routes/users"); 


app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


main()
  .then(() => {
    console.log(`connection of mongodb is successful`);
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Achievements');
};


const sessionOptions = {
  secret: "averygoodsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/api", (req, res) => {
  res.send("Root is absolutely working");
});

app.get("/api/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "No user is currently logged in." });
  }
  res.status(200).json({
    message: "Session user found.",
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    }
  });
});

app.get("/api/HomePage", (req, res) => {
  res.send("Accessing Home page");
});


app.get("/api/AcheivementPage", wrapAsync(async (req, res) => {
  let achiev = await Post.find({}).populate('user', 'username email role');
  res.json(achiev);
}));

app.get("/api/ContactPage", (req, res) => {
  res.send("Accessing Contacts page");
});
app.get("/api/EventsPage", (req, res) => {
  res.send("Accessing EventsPage page");
});


app.use("/api/dashboard", dashboardRoute);

app.post("/api/register", wrapAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const newUser = new User({ username, email, role });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err) => {
    if (err) return next(err);
    res.status(201).json({
      message: "User registered successfully!",
      user: { username: registeredUser.username, role: registeredUser.role, email: registeredUser.email }
    });
  });
}));

app.post("/api/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message || "Incorrect email or password." });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login successful!",
        user: {
          username: req.user.username,
          role: req.user.role,
          email: req.user.email
        }
      });
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful!" });
  });
});


app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  console.error("CAUGHT ERROR:", err); 
  let { statusCode = 500, message = "Something went wrong!" } = err;

  if (err.name === 'UserExistsError') {
    statusCode = 400;
    message = "Email already registered.";
  }
  if (err.name === 'AuthenticationError') {
    statusCode = 401;
    message = "Incorrect email or password.";
  }
  
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});

