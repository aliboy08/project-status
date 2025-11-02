import { server_hooks } from './globals.js';
import { promise_resolver } from '../src/lib/utils.js';
import fs from 'fs';

const projects = [];

server_hooks.add('post/project/page/create', create_project_page)
server_hooks.add('post/project/page/delete', remove_project_page)
server_hooks.add('get/project', send_project_data)

async function send_project_data({ args, ws }){
    
    if( !ws || !args.slug ) return;

    const project_data = await get_project_data(args.slug);

    ws.send_client({
        type: 'project',
        project_data,
    })
}

async function create_project_page({ args, ws }){

    const { project_slug, page_name } = args;
    if( !project_slug || !page_name ) return;
    
    const page_data = await add_page(page_name, project_slug);

    ws.send_all({
        type: 'project/page/create',
        page_data,
        project_slug,
    })
}

async function remove_project_page({ args, ws }){

    const { project_slug, page_name } = args;
    if( !project_slug || !page_name ) return;
    
    const project_data = await get_project_data(project_slug);

    const index_to_remove = project_data.pages.findIndex(i=>i.name==page_name)
    
    if( index_to_remove === -1 ) return;

    project_data.pages.splice(index_to_remove, 1);
    
    save_project_data(project_data, project_slug);

    ws.send_all({
        type: 'project/page/delete',
        page_name,
        project_slug,
    })
}

async function add_page(page_name, project_slug){

    const project_data = await get_project_data(project_slug)

    const page_data = init_page_data(page_name, project_data)

    save_project_data(project_data, project_slug)
    
    return page_data;
}

function get_project_data(project_slug){

    const item = get_item(project_slug);
    if( item ) return item;

    const file_path = `./data/projects/${project_slug}.json`;

    const { resolve, promise } = promise_resolver();

    fs.readFile(file_path, 'utf8', (err, data) => {

        if ( err ) {
            console.error('Error reading file:', err);
            return;
        }

        const project_data = JSON.parse(data)
        
        add_item(project_data);

        resolve(project_data);
    });

    return promise;
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

function save_project_data(project_data, project_slug){
    
    const file_path = `./data/projects/${project_slug}.json`;
    
    fs.writeFile(file_path, JSON.stringify(project_data), err => {
        if (err) {
            return console.error('Error writing file:', err);
        }
    });
}

function add_item(item_data){
    if( projects.find(i=>i.item_data==item_data.slug) ) return;
    projects.push(item_data)
}

function get_item(slug){
    return projects.find(i=>i.item_data==slug);
}