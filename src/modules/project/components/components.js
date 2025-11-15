import { hooks } from 'src/main/globals'
import { create_div } from 'src/lib/utils'

hooks.on('page/init', render_components)

function render_components({ el, page, project_slug }){
    
    const components_con = create_div('components_con', el);
    const container = create_div('components', components_con);
    
    hooks.do('components/init', { page, container, project_slug })
}