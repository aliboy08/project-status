import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { server_message } from 'src/main/globals';

let pages;
let pages_con;
let project_slug;
let container;

hooks.add('project/init_data', init)
server_message.add('project/page/add', page_add)
server_message.add('project/page/remove', page_remove)

function init(e){

    container = e.container;
    const data = e.data;

    pages_con = create_div('pages', container)
    if( !data.pages ) return;
    
    pages = data.pages;
    project_slug = data.slug;
    
    data.pages.forEach((page)=>{
        page.el = init_item(page);
    })

    hooks.do('pages/init', { pages, project_slug })
}

function init_item(page){
    
    const el = create_div('page', pages_con, page.name)

    hooks.do('page/init', { el, page, project_slug })

    return el;
}

function page_add(e){

    if( project_slug !== e.project_slug ) return;

    const page = e.page_data;

    pages.push(page)

    page.el = init_item(e.page_data)
}

function page_remove(e){
    
    if( project_slug !== e.project_slug ) return;

    const index_to_remove = pages.findIndex(i=>i.name==e.page_name);

    if( index_to_remove === -1 ) return;
    
    pages[index_to_remove].el.remove();

    pages.splice(index_to_remove, 1);
}
