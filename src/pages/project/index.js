import './project.css';
import { create_div } from 'src/lib/utils';
import { hooks } from 'src/main/globals';
import 'modules/project/project_page/init';

export function render(params){

    const container = create_div('#page_project')
    const slug = params.path_args[1];

    hooks.do('project/init', { container, slug })

    return container;
}