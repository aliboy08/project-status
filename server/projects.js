import { server_hooks } from './globals.js';
import fs from 'fs';

const projects = get_projects();

server_hooks.add('post/project/create', create_project)
server_hooks.add('get/projects', send_projects)

function send_projects({ ws }){
    if( !ws ) return;
    ws.send_client({
        type: 'projects/update',
        projects,
    })
}

function create_project({ args, ws }){

    if( !args.data ) return;
    
    const project = args.data;

    projects.push(project)

    const file_path = `./data/projects/${project.slug}.json`;
    
    fs.writeFile(file_path, JSON.stringify(project), err => {

        if (err) {
            return console.error('Error writing file:', err);
        }

        ws.send_all({
            type: 'project/create',
            project,
        })
    });
}

function get_projects(){

    const projects = [];

    const folder_path = './data/projects';

    try {

        const files = fs.readdirSync(folder_path);
        
        for( const file of files ) {
            
            const file_data = fs.readFileSync(`${folder_path}/${file}`, 'utf8');

            const project_data = JSON.parse(file_data);

            projects.push({
                name: project_data.name,
                slug: project_data.slug,
            })
        }

    } catch (err) {
        console.error('Error reading directory synchronously:', err);
    }

    return projects;
}