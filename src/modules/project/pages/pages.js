import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { server_message } from 'src/main/globals';

let pages;
let pages_con;
let project_id;

hooks.set('project/page', get_page)
hooks.on('project/init_data', init)
server_message.on('page/add', page_add)
server_message.on('page/remove', page_remove)
function get_page(e){
    if( project_id !== e.project_id ) return null;
    return pages.find(i=>i.id===e.page_id);
}

function init(e){

    const data = e.data;

    pages_con = create_div('pages', e.container)
    if( !data.pages ) return;
    
    pages = data.pages;
    project_id = data.id;

    console.log({pages})
    
    data.pages.forEach(create_el)

    hooks.do('pages/init', { pages, project_id })
}

function create_el(page){
    
    const el = create_div('page', pages_con)
    
    el.dataset.id = page.id

    create_div('page_name', el, page.name)

    el.controls = create_div('page_controls', el)

    page.el = el;

    hooks.do('page/init', { el, page, project_id })

    return el;
}

function page_add(e){

    if( project_id !== e.project_id ) return;

    const page = e.page;
    create_el(page)
    pages.push(page)
}

function page_remove(e){
    
    if( project_id !== e.project_id ) return;

    const index_to_remove = pages.findIndex(i=>i.id==e.page_id);
    if( index_to_remove === -1 ) return;
    
    pages[index_to_remove].el.remove();
    pages.splice(index_to_remove, 1);
}
