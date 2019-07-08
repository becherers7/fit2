let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let passport = require('passport');
let config = require('./config');
let PORT = 8000;
let _ = require('underscore');
require('./database').connect(config.dbUri);

let cors = require('cors');
let app = express();

//tells app to parse HTTP body messages.
app.use(bodyParser.urlencoded({ extended: false }));

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

let io = require('socket.io').listen(server);

io.set('origins', '*:*');
// console.log('io: ', io);
let connections = [];
let messages = [];
let channels = [];
let workouts = [];
let liveUsers = [];
let members = [];
//listen for a connection, where a connection event occurs when a socket gets connected
io.sockets.on('connection', (socket) => {
  console.log('connecting to sockets: ');
  // we need to have an array for all the live users?
  // we need the users name upon login...
  //-remove socket from our connections upon disconnect.
  socket.once('disconnect', function(err){
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
  });
  connections.push(socket.id);
  console.log("%s sockets connected: ", connections.length);
  socket.on('join', (payload) => {
    let userJoined = {
      id: socket.id,
      email: payload.email
    }
  });
  socket.on('chat message', (msg) => {
    console.log("message: ", msg);
    messages.push(msg);
    socket.emit('updateMessages', messages);
    console.log("messages: ", messages);
  });

  //-ok so we need t add a componentDidUpdate component
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
    // socket.emit('updateWorkouts', workouts);
  });
  // socket.on('create user', (user) => {
  //   console.log("new user: ", user);
  //   app.use("/api/users", users);
  // });
});
