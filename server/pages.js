import { server } from './globals.js';
import { get_project_data } from './project.js';

server.hooks.add('post/project/page/add', page_add)
server.hooks.add('post/project/page/remove', page_remove)
server.hooks.add('post/project/page/assign', page_assign)  

function page_add({ args, ws }){

    const { project_slug, page_name } = args;
    if( !project_slug || !page_name ) return;
    
    const project_data = get_project_data(project_slug)

    const page_data = init_page_data(page_name, project_data)

    server.hooks.do('save/project', { project_data, project_slug })

    ws.send_all({
        type: 'project/page/add',
        page_data,
        project_slug,
    })
}

function page_remove({ args, ws }){

    const { project_slug, page_name } = args;
    if( !project_slug || !page_name ) return;
    
    const project_data = get_project_data(project_slug)

    const index_to_remove = project_data.pages.findIndex(i=>i.name==page_name)
    
    if( index_to_remove === -1 ) return;

    project_data.pages.splice(index_to_remove, 1);
    
    server.hooks.do('save/project', { project_data, project_slug })

    ws.send_all({
        type: 'project/page/remove',
        page_name,
        project_slug,
    })
}

function page_assign({ args, ws }){

    const { project_slug, page_name, user } = args;
    if( !project_slug || !page_name || !user ) return;
    
    const project_data = get_project_data(project_slug)
    
    const page = get_page(page_name, project_data);
    if( !page ) return;

    page.user = user;

    server.hooks.do('save/project', { project_data, project_slug })

    ws.send_all({
        type: 'project/page/assign',
        page_name,
        project_slug,
        user,
    })
}
 
function init_page_data(page_name, project_data){

    if( !project_data.pages ) {
        project_data.pages = [];
    }

    const page_data = {
        name: page_name,
        status: null,
        components: [],
    }

    project_data.pages.push(page_data);

    return page_data;
}

function get_page(page_name, project_data){
    for( const page of project_data.pages ) {
        if( page.name === page_name ) {
            return page;
        }
    }
    return null;
}