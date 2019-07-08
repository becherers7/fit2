let express = require('express');
let bodyParser = require('body-parser')
let morgan = require('morgan')
let passport = require('passport');
let config = require('./config');
let PORT = 8000
require('./database').connect(config.dbUri);

let cors = require('cors');
let app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//tells app to parse HTTP body messages.
app.use(bodyParser.urlencoded({ extended: false }));


// GREAT JOB STEVE!!! YOU ARE POTENTIALLY 2 BIG STEPS AWAY FROM CREATING A ROOM THAT PEOPLE CAN CHAT WITH
// NEXT STEP, YOU NEED TO CREATE A SOCKETS CLASS ON THE SERVER SIDE.
// INSIDE THE SOCKETS CLASS: 
// 1) YOU NEED TO CREATE A ROOM DYNAMICALLY BASED ON THE NAME
// 2) YOU NEED TO CALL A CONTROLLER THAT LOOKS UP EACH MEMBER IN IN THE
// MEMBERS ARRAY AND SENDS THEM INVITES WITH THE CHANNELS NAME AND PURPOSE.
// UPON ACCEPT, THE MEMBER THEN JOINS THE ROOM CREATED.
// 3) YOU NEED TO EMIT RIGHT AWAY THAT THE ROOM IS CREATED SO USER ONE CAN GO AHEAD.
// 4) YOU NEED TO EMIT WHEN A MEMBER ACCEPTS THEIR INVITATION.
// 5) ON THE UI, YOU NEED TO ACCESS THE EMAIL FROM THE JWT TOKEN. USE THIS FOR USERNAME FOR NOW.
// THIS WILL WHAT YOU SEE WHEN YOU POST A MESSAGE: USERNAME: 'SOME MESSAGE'
// THEN YOU'RE FINISHED WITH ROUGH CHAT SYSTEM!


// Route requires
let user = require('./routes/User');

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// initialize passport middleware
app.use(passport.initialize());

// passport strategies
let localSignupStrategy = require('./passport/local-signup');
let localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
let authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Starting Server
let server = app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})


io.set('origins', '*:*');
// console.log('io: ', io);
let connections = [];
let messages = [];
let channels = [];
let workouts = [];

//listen for a connection, where a connection event occurs when a socket gets connected
io.sockets.on('connection', (socket) => {
  console.log('connecting to sockets: ');
  socket.once('disconnect', function(err){
    console.log('disconnect');
    throw new Error(err);
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
    // socket.emit('updateChannels', channels);
  });
  socket.on('create workout', (workout) => {
    console.log("workout to emit: ", workout);
    console.log("workouts: ", workouts);
    workouts.push(workout);
    console.log("workouts looks like: ", workouts);
    // socket.emit('updateWorkouts', workouts);
  });
  // socket.on('create user', (user) => {
  //   console.log("new user: ", user);
  //   app.use("/api/users", users);
  // });
});
