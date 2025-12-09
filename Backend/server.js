if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

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

const adminRoute=require("./routes/adminRoute");
const dashPostsRoute = require("./routes/dashPostsRoute"); 
const { isVerified } = require("./utils/middleware");

const sendOTP = require('./utils/email.js'); 

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

//home route
app.get("/api", (req, res) => {
  res.send("Root is absolutely working");
});

//verifying user
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
      role: req.user.role,
      isVerified: req.user.isVerified,
    }
  });
});

//home page
app.get("/api/public/achievements", wrapAsync(async (req, res) => {
  const publicPosts = await Post.find({ isVerified: true }) 
    .populate('user', 'username role email') 
    .sort({ createdAt: -1 }) 
    .limit(3); 
    
  res.json(publicPosts);
}));

//acheivements of all studetns
app.get("/api/AcheivementStudent", wrapAsync(async (req, res) => {
  const students=await User.find({role:"student",isVerified:true}).select('_id');
  const studentId=students.map(student=>student._id);
  let achiev = await Post.find({user:{$in:studentId},isVerified:true}).populate('user', 'username email role').sort({createdAt:-1});
  res.json(achiev);
}));

//acheivements of all faculties
app.get("/api/AcheivementFaculty", wrapAsync(async (req, res) => {
  const faculties=await User.find({role:"faculty"}).select('_id');
  const facultiesId=faculties.map(faculty=>faculty._id);
  let achiev = await Post.find({user:{$in:facultiesId}}).populate('user', 'username email role').sort({createdAt:-1});
  res.json(achiev);
}));

//acheivementss of all alumnies
app.get("/api/AcheivementAlumni", wrapAsync(async (req, res) => {
  const alumnies=await User.find({role:"alumni"}).select('_id');
  const alumniId=alumnies.map(alumni=>alumni._id);
  let achiev = await Post.find({user:{$in:alumniId}}).populate('user', 'username email role').sort({createdAt:-1});
  res.json(achiev);
}));

//contact page
app.get("/api/ContactPage", (req, res) => {
  res.send("Accessing Contacts page");
});

app.get("/api/AlumniPage", async(req, res) => {
  const alums=(await User.find({role:"alumni"}));
  res.json(alums);
});


//events page
app.get("/api/EventsPage", (req, res) => {
  res.send("Accessing EventsPage page");
});

//middle ware route for dashboard
app.use("/api/dashboard", dashPostsRoute);
app.use("/api/admin",adminRoute);

//api/register
app.post("/api/register", wrapAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  
  let isAccountApproved = false; 
  if (role === "staff") { 
    if (email !== "chawanvikash30@gmail.com") {
      throw new ExpressError(403, "Registration denied. You are not the authorized admin.");
    }
    isAccountApproved = true; 
  } 
  else {
    const officialDomain = ".iiests.ac.in";    
    if (role !== 'alumni') {
      if (!email || !email.endsWith(officialDomain)) {  
        throw new ExpressError(400, `Registration denied. You must use an official email address ending in ${officialDomain}`);
      }
    } 
    isAccountApproved = false; 
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  const newUser = new User({ 
    username, 
    email, 
    role, 
    isVerified: isAccountApproved, 
    isEmailVerified: false,        
    otp,                           
    otpExpires                     
  }); 
  const registeredUser = await User.register(newUser, password);
  await sendOTP(email, otp);

  res.status(200).json({
    message: "Registration successful! OTP sent to your email.",
    email: email 
  });
}));

// POST /api/verify-otp
app.post('/api/verify-otp', wrapAsync(async (req, res, next) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });  
    if (user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired OTP." });
    }
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    if (user.isVerified) { 
        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ 
                message: "Email Verified! Logged in successfully.", 
                user: { 
                    username: user.username, 
                    role: user.role, 
                    email: user.email 
                },
                redirect: "/dashboard"
            });
        });
    } 

    else {
        res.status(200).json({ 
            message: "Email verified! Please wait for Faculty Admin approval.",
            redirect: "/login"
        });
    }
}));

//login
app.post("/api/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message || "Incorrect email or password." });
    }
    if (user.isVerified === false) {
    throw new ExpressError(403, "Forbidden: Your account is not verified. Please wait for an admin to approve it.");
  }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login successful!",
        user: {
          username: req.user.username,
          role: req.user.role,
          email: req.user.email,
          isVerified: req.user.isVerified,
        }
      });
    });
  })(req, res, next);
});

//for logout
app.post("/api/logout",(req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful!" });
  });
});


//middle wares for the error handling
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

//listening server on port 8080;
app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});

