import { create_div } from 'src/lib/utils';
import { Project_Pages_Form } from 'modules/project/project_pages_form';
// import { Project_Data } from 'modules/project/project_page/project_page';

export default function Admin_Project_Page(slug){
    const html = create_div('')
    // html.append(Project_Data(slug))
    html.append(Project_Pages_Form(slug))
    return html;
}