import { create_div } from 'src/lib/utils'
import { hooks, user } from 'src/main/globals'
import { ws } from 'src/main/ws';

let project_slug, pages;

hooks.add('pages/init', (e)=>{
    project_slug = e.project_slug;
    pages = e.pages;

    console.log({ pages, project_slug })
})

hooks.add('page/init', init_assign)
hooks.add('page/init', display_user)

hooks.add('server/message/project/page/assign', update_page_user)

function init_assign(args){

    if( !user ) return;

    create_div('', args.el, 'Assign').onclick = ()=>{
        assign(args)
    };
}

function assign(args){
    ws.post('project/page/assign', {
        page_name: args.page.name,
        project_slug: args.project_slug,
        user,
    })
}

function display_user(args){

    const assigned_user = args.page.user;
    if( !assigned_user ) return

    const el = create_div('user', args.el)
    el.title = assigned_user.full_name;
    el.style.backgroundImage = `url(${assigned_user.image_url})`;
}

function update_page_user(e){

    if( project_slug !== e.project_slug ) return;
    
    const page = pages.find(i=>i.name===e.page_name)
    if( !page ) return;

    page.user = e.user;

    display_user({
        el: page.el,
        page,
    });

}