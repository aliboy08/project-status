import { server } from './globals.js';
import fs from 'fs';

const projects = server.projects;

server.hooks.add('get/project', send_project_data)
server.hooks.add('save/project', save_project_data)

function send_project_data({ args, ws }){
    
    if( !ws || !args.slug ) return;

    const project_data = get_project_data(args.slug);

    ws.send_client({
        type: 'project',
        project_data,
    })
}

export function get_project_data(project_slug){

    const item = get_item(project_slug);
    if( item ) {
        return item;
    }

    const file_path = `./data/projects/${project_slug}.json`;

    const file_data = fs.readFileSync(file_path, 'utf8');
    
    const project_data = JSON.parse(file_data)
        
    add_item(project_data);

    return project_data;
}

function save_project_data({project_data, project_slug}){
    
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