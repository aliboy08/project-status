import './page_header.css';

import { get_el } from 'src/lib/utils';
import { hooks } from 'src/main/globals';
import { Active_Users } from 'modules/users/active_users/active_users';
import { Top_Nav } from 'modules/top_nav/top_nav';

hooks.on('init', init)
function init(){
    const container = get_el('#page_header');
    container.append(Active_Users())
    container.append(Top_Nav())
}