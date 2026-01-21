if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const port= process.env.PORT || 8080 ;
const path = require("path");

const mongoose = require('mongoose');
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localStrategy = require("passport-local");

const User  = require("./models/user.js");
const Post  = require("./models/post.js");
const Review=require("./models/review.js");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync"); 

const adminRoute=require("./routes/adminRoute");
const dashPostsRoute = require("./routes/dashPostsRoute"); 

const sendOTP = require('./utils/email.js'); 
const allowedOrigins = [
  "http://localhost:5173", 
  "https://achievement-portal.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    // Use .includes() for cleaner check
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      // Log the blocked origin to your Render console so you can see what to add next
      console.log("Blocked by CORS:", origin); 
      return callback(new Error('CORS policy block'), false);
    }
  },
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
  .then(() => {
    console.log(`connection of mongodb is successful`);
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
};

const store = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600, 
});

store.on("error", (err) => console.log("SESSION STORE ERROR", err));

const sessionOptions = {
  store: store, // This links your sessions to your MongoDB database
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", 
    secure: true,    
  },
};
app.set("trust proxy", 1);
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
      isEmailVerified:req.user.isEmailVerified,
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

//acheivement of institue
app.get("/api/AcheivementInstitute", wrapAsync(async (req, res) => {
  const insties=await User.find({role:"staff"}).select('_id');
  const instids=insties.map(insti=>insti._id);
  let achiev = await Post.find({user:{$in:instids}}).populate('user', 'username email role').sort({createdAt:-1});
  res.json(achiev);
}));

//individual achievement
app.get('/api/posts/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('user', 'username role email');   
    if (!post) {
        throw new ExpressError(404, "Achievement not found");
    }
    res.json(post);
}));


//contact page
app.post("/api/contact/review", wrapAsync(async (req, res) => {
  const { name, email, review } = req.body;
  if (!name || !email || !review) {
    throw new ExpressError(400, "All fields (name, email, message) are required.");
  }
  const newReview = new Review({
    name,
    email,
    review
  });
  await newReview.save();
  console.log("New Contact Message Saved:", newReview);
  res.status(201).json({ 
      message: "Message sent successfully!", 
      data: newReview 
  });
}));

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

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.isEmailVerified) {
      throw new ExpressError(400, "User already exists. Please login.");
    } else {
      await User.findByIdAndDelete(existingUser._id);
    }
  }
  const  AdminEmail=process.env.AdminEmail;
  let isAccountApproved = false; 
  if (role === "staff") { 
    if (email !== AdminEmail) {
      throw new ExpressError(403, "Registration denied. You are not the authorized admin.");
    }
    isAccountApproved = true; 
  } 
  else if(role === 'student' || role==='faculty'){
    const officialDomain = ".iiests.ac.in";    
      if (!email || !email.endsWith(officialDomain)) {  
        throw new ExpressError(400, `Registration denied. You must use an official email address`);
      }
  
    isAccountApproved = true; 
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
                redirect: "/dashboard/*"
            });
        });
    } 

    else {
        res.status(200).json({ 
            message: "Email verified! Please wait for Admin approval.",
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
          isEmailVerified:req.user.isEmailVerified,
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

