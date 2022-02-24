const express = require('express')

const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const path = require('path')
const io = require('socket.io')(server)
app.use(express.static(path.join(`${__dirname}/public`)));

users = [];
io.on('connection', socket => {
  // console.log('Some client connected');
  socket.on('setUsername', function(data)
  {
    console.log(data);
    if(users.indexOf(data) > -1){
      console.log(data);
       socket.emit('userExists', data + ' username is taken! Try some other username.');
    } else {
      console.log(data);
       users.push(data);
       socket.emit('userSet', data);
    }
 });
  socket.on('chat', message => {
    console.log('From client: ', message)
    io.emit('chat', message)
  })
})
app.get('/', (req, res) => {
  res.status(200).send(index.html)
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})