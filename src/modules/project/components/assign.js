import { create_div } from 'src/lib/utils'
import { hooks, user } from 'src/main/globals'
import { server_message } from 'src/main/globals';
import { server_request } from 'src/main/ws';

let project_id, pages;

hooks.on('project/init_data', (e)=>{
    // page, container, project_id, components_con
    project_id = e.data.id;
    pages = e.data.pages;

    console.log('components', { project_id, pages })
})

hooks.on('component/init', init_assign)
hooks.on('component/init', display_user)

server_message.on('component/assign', update_component_user)

function init_assign(args){

    if( !user ) return;

    create_div('', args.component.el.controls, 'Assign').onclick = ()=>{

        server_request('component/assign', {
            user: user.email,
            component_id: args.component.id,
            page_id: args.page.id,
            project_id: args.project_id,
        })
    };
}

function display_user(args){
    
    if( !args.component.assigned?.length ) return

    const assigned_user = args.component.assigned[0];

    console.log('component/display_user', args)
    
    if( args.component.el.user ) {
        args.component.el.user.title = assigned_user.full_name;
        args.component.el.user.style.backgroundImage = `url(${assigned_user.image_url})`;
        return;
    }

    const user_el = create_div('user')
    args.component.el.prepend(user_el)
    args.component.el.user = user_el;

    user_el.title = assigned_user.full_name;
    user_el.style.backgroundImage = `url(${assigned_user.image_url})`;
}

function update_component_user(e){
    
    if( project_id !== e.project_id ) return;
    
    const page = pages.find(i=>i.id===e.page_id)
    if( !page ) return;
    
    const component = page.components.find(i=>i.id===e.component_id)
    if( !component ) return;

    component.assigned = [{...e.user_data}];

    display_user({
        component,
    });

}