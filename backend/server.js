const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const passport = require("passport");   // ⭐ ADD THIS
const { Server } = require("socket.io");
require("dotenv").config();
require("./config/passport");


const authRoutes = require("./routes/authRoutes");
const dustbinRoutes = require("./routes/dustbinRoutes");
const routeRoutes = require("./routes/routeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());   // ⭐ ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/dustbins", dustbinRoutes);
app.use("/api/routes", routeRoutes);


/* HTTP SERVER */

const server = http.createServer(app);


/* SOCKET.IO */

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});


/* DATABASE */

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

  server.listen(5000, () => {

    console.log("Server running on port 5000");

  });

})
.catch(err => console.log(err));


/* EXPORT IO */

module.exports = io;