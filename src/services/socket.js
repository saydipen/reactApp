import clientSocket from 'socket.io-client';
import { BASE_URL } from './constants';
const url = `${BASE_URL}watch`;
const socket = clientSocket(url);

socket.on('connect', () => {
    console.log('socket connected');
});

socket.on('ping', () => {});

socket.on('disconnect', () => {
    console.log('socket disconnected');
});

socket.on('pong', (data) => {
    console.log(data, ' number of ms elapsed since ping packet.')
});

socket.subscribeData = (cb) => {
    socket.emit('sub', {state: true});

    socket.on('data', (data, callback) => {
        cb(null, data);
        const Acknowledgement = 1;
        callback(Acknowledgement);
    });

    socket.on('error', (err) => {
        cb(err);
    });
}

socket.unSubscribeData = () => {
    socket.emit('unsub', {state: false});
}

export default socket;