let express = require('express');
let app = express();
let _ = require('underscore');
let path = require('path');
let audience = [];
let connections = [];
let title = "Untitled Presentation";
let speaker = {};
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
  socket.once('disconnect', () => {
      let member = _.findWhere(audience, {id: socket.id});
      console.log("member: ", member);
      if(member){
        audience.splice(audience.indexOf(member), 1);
        io.sockets.emit('audience', audience);
        console.log("left: ", member.name);
      }


      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      console.log("Disconnected: %s sockets remaining.", connections.length);
  });

  //on
  socket.on('join', (payload) => {
      let newMember = {
        id: socket.id,
        name: payload.name
      };
      console.log("payload: ", payload);
      // console.log("socket: ",);
      socket.emit('joined', newMember);
      audience.push(newMember);
      console.log("our audience: ", audience);
      //-broadcast to all the sockets.
      io.sockets.emit('audience', audience);
      console.log("Audience Joined: %s", payload.name);
  });
  socket.on('start', (payload) => {
      speaker.name = payload.name;
      speaker.id =payload.id;
      speaker.type = 'speaker';
      title = payload.title;
      socket.emit('joined', speaker);
      io.sockets.emit('start', {title: title, speaker: speaker.name});
      console.log("Presentation started '%s' by %s: ", title, speaker.name);
  });
  socket.emit('welcome', {
    title: title,
    audience: audience,
    speaker: speaker.name,
  });
  connections.push(socket);
  console.log("%s sockets connected: ", connections.length);
});
