import './projects_list.css';
import { create_div } from 'src/lib/utils';
import { hooks } from 'src/main/globals';
import { load_page } from 'src/main/pages';

const projects = [];

let loading_dots;
let list_con;

hooks.add_queue('ws/init', request_data)
hooks.add('server/message/projects/update', update)
hooks.add('server/message/project/create', add_new_project)

function request_data({ ws }){
    ws.get('projects')
}

function update(payload){
    remove_loading_dots();
    remove_missing(payload.projects)
    payload.projects.forEach(add_project)
}

function add_new_project(data){
    if( !data.project ) return;
    add_project(data.project)
}

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

function remove_missing(new_projects){
    projects.forEach(project=>{
        if( new_projects.find(i=>i.slug===project.slug) ) return;
        project.el.remove();
        projects.splice(projects.indexOf(project), 1);
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