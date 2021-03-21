
const app= require('express')();


const port = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
  });

users=[];

io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('setUsername', function(data) {
       console.log(data);
       
       if(users.indexOf(data) > -1) {
          socket.emit('userExists', data + ' username is taken! Try some other username.');
       } else {
          users.push(data);
          socket.emit('userSet', {username: data});
       }
    });
    
    socket.on('msg', function(data) {
       //Send message to everyone
       io.sockets.emit('newmsg', data);
    })
 });


http.listen(port,function(error)  {
    if(error){
        console.log("something went wrong  ",error);

    }else{
    console.log("server is listening on localhost  "+port);
    }
});