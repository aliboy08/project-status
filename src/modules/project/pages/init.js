import { hooks } from 'src/main/globals';
import { server_message } from 'src/main/globals';
import { server_request } from 'src/main/ws';

let container;

import './title';
import './pages';
import './add';
import './remove';
import './assign';

import '../components/init';

hooks.on('project/init', (e)=>{
    container = e.container;
    server_request('project', { slug: e.slug })
})

server_message.on('project', (data)=>{
    if( !data.project ) return;
    hooks.do('project/init_data', {
        data: data.project,
        container,
    })
})