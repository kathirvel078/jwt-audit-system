require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");


const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
   .then(async () => {
    console.log("User DB connected");
    await createAdmin();  })
  
  .catch(err => console.log(err));


app.use("/api/auth", require("./routes/authRoutes"));

  const createAdmin = async () => {
  const admin = await User.findOne({ email: "admin@gmail.com" });

  if (!admin) {
    const hashedPassword = await bcrypt.hash("123456", 10);
    
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("✅ Default admin created");
  }
};

app.listen(process.env.PORT, () =>
  console.log(`User Service running on ${process.env.PORT}`)
);