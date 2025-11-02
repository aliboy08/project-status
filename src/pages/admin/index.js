import { create_div } from 'src/lib/utils';
import { Projects_Form } from 'modules/admin/projects_form/projects_form';
import { get_user } from 'src/lib/functions';
import Projects_List_Admin from 'modules/projects/projects_list/projects_list_admin';
import Admin_Project_Page from './project';

export function render(params){

    // if( !get_user() ) {
    //     return create_div('', null, 'Access Denied')
    // }
    
    const sub_path = params.path_args[1];

    if( sub_path === 'project' ) {
        const slug = params.path_args[2];
        return Admin_Project_Page(slug);
    }
    
    const html = create_div('#page_admin', null)

    if( sub_path === 'create_project' ) {
        html.append(Projects_Form());
    }
    else {
        html.append(Projects_List_Admin())
    }
    
    return html;
}