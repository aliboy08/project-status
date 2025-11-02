import { hooks } from 'src/main/globals'
import { parse_json } from 'src/lib/utils';

export const ws = new WebSocket('ws://localhost:8080');

const reader = new FileReader();

const parse_received_data = (data)=>{
    data = parse_json(data);
    hooks.do('server/message', data)

    // console.log('server/message', data)
    if( data.type ) {
        hooks.do(`server/message/${data.type}`, data)
    }
}

reader.onload = () => parse_received_data(reader.result)

ws.onopen = () => {
    hooks.do_queue('ws/init', { ws })
};

ws.onmessage = e => {
    if (e.data instanceof Blob) {
        reader.readAsText(e.data);
    } else {
        parse_received_data(e.data)
    }
};

ws.onclose = () => {
    alert('Disconnected from server')
    window.location.reload();
};

ws.onerror = error => {
    console.error('WebSocket error:', error);
};

ws.get = (key, args = {})=>{
    ws.send(JSON.stringify({
        get: key,
        args
    }));
}

ws.post = (key, args = {})=>{
    ws.send(JSON.stringify({
        post: key,
        args
    }));
}

ws.set = (key, args = {})=>{
    ws.send(JSON.stringify({
        set: key,
        args
    }));
}

ws.send_data = (payload)=>{
    if( typeof payload === 'object' ) {
        payload = JSON.stringify(payload);
    }
    ws.send(payload);
}