import './projects_list.css';
import { create_div } from 'src/lib/utils';
import { server_message } from 'src/main/globals';
import { load_page } from 'src/main/pages';
import { server_request } from 'src/main/ws';

let projects = [];

let loading_dots;
let list_con;

server_message.on('projects', render_projects)
// server_message.on('project/create', create_project)

server_request('projects');

function render_projects(data){
    remove_loading_dots();
    data.projects.forEach(add_project)
}

// function create_project(data){
//     if( !data.project ) return;
//     add_project(data.project)
// }

function add_project(project){
    if( !project ) return;
    if( projects.find(i=>i.slug===project.slug) ) return;

    projects.push(project)
    
    const el = create_div('', list_con, project.name)
    project.el = el;

    el.addEventListener('click', ()=>{
        load_page(`/project/${project.slug}`)
    })
}

function remove_loading_dots(){
    if( !loading_dots ) return;
    loading_dots.remove();
    loading_dots = null;
}

export default function Projects(){
    
    const con = create_div('projects_list_con')
    create_div('h mb-20 bold', con, 'Projects')
    list_con = create_div('projects_list', con)
    
    if( projects.length ) {
        projects.forEach(project=>{
            list_con.append(project.el)
        })
    } else {
        loading_dots = create_div('loading-dots', con)
        loading_dots.innerHTML = '<i></i><i></i><i></i>';
    }

    return con;
}