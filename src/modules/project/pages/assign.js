import { create_div } from 'src/lib/utils'
import { hooks, user } from 'src/main/globals'
import { server_message } from 'src/main/globals';
import { server_request } from 'src/main/ws';

let project_slug, pages;

hooks.on('pages/init', (e)=>{
    project_slug = e.project_slug;
    pages = e.pages;
})

hooks.on('page/init', init_assign)
hooks.on('page/init', display_user)

server_message.on('page/assign', update_page_user)

function init_assign(args){

    if( !user ) return;

    create_div('', args.el.page_controls, 'Assign').onclick = ()=>{
        assign(args)
    };
}

function assign(args){
    server_request('page/assign', {
        page_id: args.page.id,
        project_slug: args.project_slug,
        user: user.email,
    })
}

function display_user(args){
    
    if( !args.page.assigned?.length ) return

    console.log('display_user', args)

    const assigned_user = args.page.assigned[0];
    
    if( args.el.user ) {
        args.el.user.title = assigned_user.full_name;
        args.el.user.style.backgroundImage = `url(${assigned_user.image_url})`;
        return;
    }

    const user_el = create_div('user')
    args.el.prepend(user_el)
    args.el.user = user_el;

    user_el.title = assigned_user.full_name;
    user_el.style.backgroundImage = `url(${assigned_user.image_url})`;
}

function update_page_user(e){

    if( project_slug !== e.project_slug ) return;
    
    const page = pages.find(i=>i.id===e.page_id)
    if( !page ) return;

    page.assigned = [{...e.user_data}];

    display_user({
        el: page.el,
        page,
    });

}