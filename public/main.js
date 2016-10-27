$(document).ready(function() {
    var socket = io();
    var input = $('input#message');
    var messages = $('#messages');
    var countContainer = $('#userCount');
    var userName = 'sara';

   $('#postusername').on('click', function(event) {
        userName = $('#username').val()
        socket.emit('user', userName);
       // $('p.userId').hide();
    });

    var addMessage = function(message) {
        messages.append('<div>'+ message +'</div>');
    };

    var displayCount = function(count) {
        countContainer.html('<div> Number of current users: ' + count + '</div>');
    };


    input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        return;
    }



    var message = input.val();
    addMessage(message);
    socket.emit('message', message);

    var count = 
    displayCount(count);
    socket.emit('count', count);
    input.val('');
});

socket.on('message', addMessage);
socket.on('count', displayCount);
});