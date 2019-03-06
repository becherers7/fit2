let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let session = require('express-session')
let dbConnection = require('./database')
let MongoStore = require('connect-mongo')(session)
let passport = require('./passport');
let cors = require('cors');
let app = express();
let PORT = 8000;
// Route requires
let user = require('./routes/User');

let connections = [];
let messages = [];
let channels = [];
let workouts = [];

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: '', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user);

// Starting Server
let server = app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

let io = require('socket.io').listen(server);

io.set('origins', '*:*');

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
