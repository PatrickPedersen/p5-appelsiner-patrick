const log = (data) => {
    const parent = document.querySelector('#boxMessages');
    const el = document.createElement('p');
    el.innerHTML = `${data.username}: ${data.message}`;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();

    const input = document.querySelector('#inputChat');
    const text = input.value;
    input.value = '';

    sock.emit('new_message', {message: text});
};

(() => {

    const socket = io();

    socket.on('new_message', (data) => {
        log(data);
    })



    document
        .querySelector('#formChat')
        .addEventListener('submit', onChatSubmitted(socket));

})();