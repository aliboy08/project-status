import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'
import { server_message } from 'src/main/globals';

hooks.on('page/init', init_components)
server_message.on('component/add', component_add)

function init_components({ el, page, project_id }){
    
    const components_con = create_div('components_con', el);
    const container = create_div('components', components_con);
    
    const add_component = (component)=>{
        const el = create_el(component);
        component.el = el;
        container.append(el)
        hooks.do('component/init', { component, page, project_id })
    }

    page.add_component = add_component;
    page.components.forEach(add_component)

    hooks.do('components/init', { page, container, project_id, components_con })
}

function component_add(e){
    const page = hooks.get('project/page', e)
    if( !page ) return;
    page.add_component(e.component);
}

function create_el(component){
    
    const el = create_div('component')
    
    el.dataset.id = component.id

    create_div('component_name', el, component.name)

    el.controls = create_div('component_controls', el);

    return el;
}