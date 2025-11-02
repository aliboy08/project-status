import './project_page.css';
import { create_div, clear_el } from 'src/lib/utils';
import { ws } from 'src/main/ws';
import { hooks } from 'src/main/globals';
import { create_loading_dots } from 'src/lib/functions';

hooks.add('server/message/project', update)
hooks.add('server/message/project/page/create', pages_update)

let container;
let loading_dots;
let pages_con;
let project_slug;

export default function Project_Page(slug){

    project_slug = slug;

    container = create_div('project_data')
    loading_dots = create_loading_dots(container);

    ws.get('project', {
        slug,
    })
    
    return container;
}

function update({ project_data }){

    console.log('project:data', project_data)
    loading_dots.remove();
    
    create_div('', container, project_data.name)
    if( !pages_con ) pages_con = create_div('pages');
    container.append(pages_con)
    
    clear_el(pages_con)
    
    if( project_data.pages ) {
        project_data.pages.forEach(page=>{
            create_div('page', pages_con, page.name)
        })
    }
}

function pages_update(e){
    if( project_slug !== e.project_slug ) return;
    create_div('page', pages_con, e.page_data.name)
}