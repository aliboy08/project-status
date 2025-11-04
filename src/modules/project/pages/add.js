import { get_user, on_enter } from 'src/lib/functions';
import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { server_request } from 'src/main/ws';

hooks.add('project/init_data', init)

function init({ data, container }){

    if( !get_user() ) return;

    const input_name = init_input(container);

    on_enter(input_name, (page_name)=>{
        submit(page_name, data.slug)
    })
}

function init_input(container){

    const con = create_div('add_page_form', container)
    const input = document.createElement('input')
    input.type = 'text';
    input.placeholder = 'Add Page';
    con.append(input)
    
    return input;
}

function submit(page_name, project_slug){

    if( !page_name ) return;

    server_request('project/page/add', {
        page_name,
        project_slug,
    })
}