const appID = prompt('Enter the name of the room you wish to join: ');
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

$('#setSize').click(function() {
    size = $('input[name=videoSize]:checked').val();
});

