import { get_user, on_enter } from 'src/lib/functions';
import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { server_request } from 'src/main/ws';

hooks.on('components/init', init)

function init({ page, components_con, project_id }){

    if( !get_user() ) return;

    const input_name = init_input(components_con);

    on_enter(input_name, (component_name)=>{

        if( !component_name ) return;

        server_request('component/add', {
            component_name,
            project_id,
            page_id: page.id,
        })
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