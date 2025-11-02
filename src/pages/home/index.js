import { create_div } from 'src/lib/utils';
import Projects from 'modules/projects/projects_list/projects_list';

export function render(){
    const html = create_div('#page_home')
    html.append(Projects());
    return html;
}