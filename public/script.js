const socket = io();
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')

var user;
function setUsername(){
    socket.emit('setUsername', document.getElementById('userName').value);
 };
var count=0;
socket.on('userExists', function(data){
    document.getElementById('welcome').innerHTML = `Welcome ${data}`;
    document.getElementById("chatSection").style.display='none';
    count++;
 })
socket.on('userSet', function(data){
    user=data;
    document.getElementById('welcome').innerText=`Welcome ${data}`;
    document.getElementById("chatSection").style.display='block';
    // var chatWindow=document.getElementById("chat-window");
    // if(count>=0)
    document.getElementById("userNameDiv").style.display='none';
    document.getElementById("requireName").style.display='none';
    // let ViewportHeight = window.innerHeight;
    // console.log(ViewportHeight);
    // document.getElementById("container").style.height=ViewportHeight;
})

chat.addEventListener('submit', event => 
{
  event.preventDefault();
  socket.emit('chat', user+": "+ Input.value);
  Input.value = ''
})
function updateScroll(){
  
  debugger;
}

const chatWindow = document.querySelector('.chat-window')
const renderMessage = message => {
  const div = document.createElement('div');
  div.classList.add('render-message');
  div.innerText =message;
  chatWindow.appendChild(div);
 setTimeout(() => 
 {
  var element = document.querySelector(".chat-window");
  element.scrollTop = element.offsetHeight;
 }, 100);
}
socket.on('chat', (message) => {
  renderMessage(message)
})