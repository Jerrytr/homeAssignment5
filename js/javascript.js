const appID = prompt('Enter the name of the channel you wish to join: ');
console.log(appID);
roomName.innerHTML += '<b>'+appID+'</b>';
const pb2 = new PB2('https://pb2-2018.jelastic.metropolia.fi/', appID);
let msg = {};
let size;
// msg.hello = 'world';
// pb2.sendJson(msg);
pb2.setReceiver(function(data) {
    console.log('size is '+size);
    console.log('socket.on message received: '+JSON.stringify(data));
    let width;
    let height;

    switch (size) {
        case 'Small':
            width = '320';
            height = '240';
            break;
        case 'Medium':
            width = '560';
            height = '315';
            break;
        case 'Large':
            width = '1280';
            height = '720';
            break;
        default:
            width = '560';
            height = '315';
    }
     let videoID = data.json.hello;
     videoArea.innerHTML = '<iframe width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+videoID+'?controls=1;'+
     'showinfo=0&autoplay=1&vq=hd720"frameborder="0" allow="autoplay;'+
     'encrypted-media" allowfullscreen></iframe>';
});

function sendMessage() {
    let message = document.getElementById('enterVideoURL').value;
    document.getElementById('videoURLForm').reset();
    message = youtubeParser(message);
    console.log(message);
    msg.hello = message;
    pb2.sendJson(msg);
}

function youtubeParser(url) {
    // regEx courtesy of a kind person at Stackoverflow: https://stackoverflow.com/a/8260383
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

$('#setSize').click(function() {
    size = $('input[name=videoSize]:checked').val();
});

$('#sendButton').click(function() {
    // size = $('input[name=videoSize]:checked').val();
    // console.log(size);
    sendMessage();
});

$('#videoURLForm').submit(function(event) {
    event.preventDefault();
    // size = $('input[name=videoSize]:checked').val();
    // console.log(size);
    sendMessage();
});

