let express = require('express');
let app = express();

let mongo = require('mongodb');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/groupout', function(err, db){
  if(err) throw err;
  console.log("Database groupout created");
  db.close();
});

let connections = [];
let messages = [];
let channels = [];
let workouts = [];


app.use(express.static('dist'));

app.use(express.static('./node_modules/bootstrap/dist'));

app.get('/', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

let server = app.listen(8000);
console.log("Polling server is running at 'http://localhost:8000'");

let io = require('socket.io').listen(server);

//listen for a connection, where a connection event occurs when a socket gets connected
io.sockets.on('connection', (socket) => {
  // socket.on('join', (payload) => {
  //   let newMember = ('joined', newMember);
  // });
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
});
