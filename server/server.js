import { WebSocketServer } from 'ws';
import { server_hooks } from './globals.js';

import './users.js';
import './projects.js';
import './project.js';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws)=>{

    ws.on('error', console.error);

    ws.on('message', (payload)=>{

        payload = JSON.parse(payload.toString('utf8'));
        // console.log('message', payload)

        if( payload.get ) {
            return server_hooks.do(`get/${payload.get}`, { args: payload.args, ws})
        }

        if( payload.set ) {
            return server_hooks.do(`set/${payload.set}`, { args: payload.args, ws})
        }

        if( payload.post ) {
            return server_hooks.do(`post/${payload.post}`, { args: payload.args, ws})
        }

        server_hooks.do('message', { payload, ws })

        if( payload.action ) {
            server_hooks.do(`message/${payload.action}`, { payload, ws })
        }
    });

    ws.on('close', ()=>{
        server_hooks.do('disconnect', { ws })
    })
    
    ws.send_client = (data)=>{
        if( typeof data === 'object' ) {
            data = JSON.stringify(data)
        }
        ws.send(data)
    }

    if( ws ) {
        ws.send_all = send_all;
    }

    server_hooks.do('connect', { ws })
});

function send_all(data){
    
    if( typeof data === 'object' ) {
        data = JSON.stringify(data)
    }

    wss.clients.forEach((client)=>{
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}