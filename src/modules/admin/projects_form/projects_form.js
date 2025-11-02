import { create_div, to_slug } from 'src/lib/utils';
import { ws } from 'src/main/ws';
import { on_enter } from 'src/lib/functions';

export function Projects_Form(){

    const container = create_div('projects_form')

    const input_name = create_input({
        placeholder: 'Project Name',
        container,
    })
    
    on_enter(input_name, (project_name)=>{
        submit({
            name: project_name,
            slug: to_slug(project_name),
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

function submit(data){
    ws.post('project/create', {data})
}