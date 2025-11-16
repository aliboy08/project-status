import { create_div } from 'src/lib/utils';
import { ws } from 'src/main/ws';
import { on_enter } from 'src/lib/functions';

export function Project_Pages_Form(id){

    const container = create_div('projects_form')

    const name_input = create_input({
        placeholder: 'Page Name',
        container,
    })

    on_enter(name_input, (page_name)=>{
        submit({
            page_name,
            project_id: id,
        })
    })

    return container;
}

function create_input(args){

    const input = document.createElement('input')

    const input_con = create_div('input_con', args.container)
    input_con.append(input)

    if( args.name ) input.name = args.name;
    if( args.placeholder ) input.placeholder = args.placeholder;

    return input;
}

function submit(args){
    if( !args.page_name || !args.project_id ) return;
    ws.post('project/page/create', args)
}