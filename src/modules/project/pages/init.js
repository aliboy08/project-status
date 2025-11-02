import { hooks } from 'src/main/globals';
import { ws } from 'src/main/ws';

let container;

import './title';
import './pages';
import './add';
import './remove';
import './assign';

hooks.add('project/init', (e)=>{
    container = e.container;
    ws.get('project', { slug: e.slug })
})

hooks.add('server/message/project', ({ project_data })=>{
    hooks.do('project/init_data', {
        data: project_data,
        container,
    })
})