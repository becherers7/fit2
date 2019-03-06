let express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

let app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(express.static('dist'));

app.use(express.static('./node_modules/bootstrap/dist'));

app.get('/', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes

let server = app.listen(8000);
console.log("Polling server is running at 'http://localhost:8000'");

let io = require('socket.io').listen(server);

let connections = [];
let messages = [];
let channels = [];
let workouts = [];

//listen for a connection, where a connection event occurs when a socket gets connected
io.sockets.on('connection', (socket) => {

  socket.once('disconnect', function(){
    console.log('user disconnected');
  });
  connections.push(socket);
  console.log("%s sockets connected: ", connections.length);
  socket.on('chat message', (msg) => {
    console.log("message: ", msg);
    messages.push(msg);
    socket.emit('updateMessages', messages);
    console.log("messages: ", messages);
  });
  socket.on('channel room', (channel) => {
    console.log("incoming channel: ", channel);
    channels.push(channel);
    console.log("channels to emit: ", channels);
    socket.emit('updateChannels', channels);
  });
  socket.on('create workout', (workout) => {
    console.log("workout to emit: ", workout);
    console.log("workouts: ", workouts);
    workouts.push(workout);
    console.log("workouts looks like: ", workouts);
    socket.emit('updateWorkouts', workouts);
  });
  socket.on('create user', (user) => {
    console.log("new user: ", user);
    app.use("/api/users", users);
  });
});
