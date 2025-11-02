import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { ws } from 'src/main/ws';
import { get_user } from 'src/lib/functions';

const user = get_user();

let pages;
let pages_con;
let project_slug;
let container;

hooks.add('project/init_data', init)
hooks.add('server/message/project/page/create', page_create)
hooks.add('server/message/project/page/delete', page_delete)

function init(e){

    console.log('init', e)

    container = e.container;
    const data = e.data;

    pages_con = create_div('pages', container)

    if( !data.pages ) return;
    
    pages = data.pages;
    project_slug = data.slug;
    
    data.pages.forEach((page)=>{
        page.el = create_item(page);
    })
}

function create_item(page){
    
    const el = create_div('page', pages_con, page.name)
    
    if( user ) init_delete_item(el, page);
 
    return el;
}

function page_create(e){

    if( project_slug !== e.project_slug ) return;

    const page = e.page_data;
    pages.push(page)
    page.el = create_item(e.page_data)
}

function page_delete(e){
    
    if( project_slug !== e.project_slug ) return;

    const index_to_remove = pages.findIndex(i=>i.name==e.page_name);

    if( index_to_remove === -1 ) return;
    
    pages[index_to_remove].el.remove();

    pages.splice(index_to_remove, 1);
}

function init_delete_item(el, page){

    create_div('delete', el, 'Remove').onclick = ()=>{

        ws.post('project/page/delete', {
            page_name: page.name,
            project_slug,
        })
    }
}