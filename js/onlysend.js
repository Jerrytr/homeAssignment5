const appID = prompt('Enter the name of the room you wish to join: ');
console.log(appID);
roomName.innerHTML += '<b>'+appID+'</b>';
const pb2 = new PB2('https://pb2-2018.jelastic.metropolia.fi/', appID);
let msg = {};
let size;

function youtubeParser(url) {
    // regEx courtesy of a kind person at Stackoverflow: https://stackoverflow.com/a/8260383
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function getMessage() {
    let message = document.getElementById('enterVideoURL').value;
    document.getElementById('videoURLForm').reset();
    message = youtubeParser(message);
    console.log(message);
    msg.hello = message;
    pb2.sendJson(msg);
}

$('#sendButton').click(function() {
    // size = $('input[name=videoSize]:checked').val();
    // console.log(size);
    getMessage();
});

$('#videoURLForm').submit(function(event) {
    event.preventDefault();
    // size = $('input[name=videoSize]:checked').val();
    // console.log(size);
    getMessage();
});

