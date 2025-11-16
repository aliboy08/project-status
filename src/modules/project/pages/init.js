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

hooks.on('project/init', init_project)
server_message.on('project', init_project_data)

function init_project(e){
    container = e.container;
    server_request('project', { project_id: e.project_id })
}

function init_project_data(data){
    if( !data.project ) return;
    hooks.do('project/init_data', {
        data: data.project,
        container,
    })
}