import { get_user, on_enter } from 'src/lib/functions';
import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { server_request } from 'src/main/ws';

hooks.on('components/init', init)

function init({ page, container, project_slug }){

    if( !get_user() ) return;

    // console.log('component/add', {page, container, project_slug})

    const input_name = init_input(container);

    on_enter(input_name, (component_name)=>{
        submit(component_name, project_slug, page.name)
    })
}

function init_input(container){

    const con = create_div('add_component_form', container)
    const input = document.createElement('input')
    input.type = 'text';
    input.placeholder = 'Add Component';
    con.append(input)
    
    return input;
}

function submit(component_name, project_slug, page_name){

    if( !component_name ) return;

    server_request('component/add', {
        component_name,
        project_slug,
        page_name,
    })
}