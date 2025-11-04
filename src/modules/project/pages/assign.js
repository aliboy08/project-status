import { create_div } from 'src/lib/utils'
import { hooks, user } from 'src/main/globals'
import { server_message } from 'src/main/globals';
import { server_request } from 'src/main/ws';

let project_slug, pages;

hooks.add('pages/init', (e)=>{
    project_slug = e.project_slug;
    pages = e.pages;
})

hooks.add('page/init', init_assign)
hooks.add('page/init', display_user)

server_message.add('project/page/assign', update_page_user)

function init_assign(args){

    if( !user ) return;

    create_div('', args.el, 'Assign').onclick = ()=>{
        assign(args)
    };
}

function assign(args){
    server_request('project/page/assign', {
        page_name: args.page.name,
        project_slug: args.project_slug,
        user: user.email,
    })
}

function display_user(args){
    
    if( !args.page.assigned?.length ) return

    const assigned_user = args.page.assigned[0];

    console.log('display_user', { args, assigned_user})
    
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
    
    const page = pages.find(i=>i.name===e.page_name)
    if( !page ) return;

    display_user({
        el: page.el,
        page: e.page,
    });

}