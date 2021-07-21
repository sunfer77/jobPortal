require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

const job_Seeker_Routes = require("./Routes/Job_Seeker/jobSeekerRoutes");
const job_Routes = require("./Routes/Jobs/JobsRoutes");
const company_Routes = require("./Routes/Company/CompanyRoutes");
const port = process.env.PORT || 8001;

//Remove or comment out cors() before deploy to heroku
app.use(
  cors({
    origin: [`http://localhost:8001`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  session({
    key: "_session",
      secret: "process.env.SESSION_SECRET",
      resave: false,
    saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
);

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/jobSeeker", job_Seeker_Routes);
app.use("/jobs", job_Routes);
app.use("/company", company_Routes);

app.listen(port, () => {
  console.log(`App Is Running`);
});
