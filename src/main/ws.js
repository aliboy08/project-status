import { hooks, server_message } from 'src/main/globals'
import { parse_json } from 'src/lib/utils';

export const ws = new WebSocket('ws://localhost:8080');

const reader = new FileReader();

const parse_received_data = (payload)=>{

    payload = parse_json(payload);

    // hooks.do('server/message', payload)

    console.log('server/message', payload)

    if( payload.key ) {
        server_message.do(payload.key, payload.data ?? null)
    }
    
    // if( data.type ) {
    //     hooks.do(`server/message/${data.type}`, data)
    // }
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

export function server_request(key, data = {}){
    const payload = JSON.stringify({
        key,
        data
    });
    ws.send(payload)
}