import { hooks } from 'src/main/globals';
import { create_div } from 'src/lib/utils';
import { get_user } from 'src/lib/functions';
import { load_page } from 'src/main/pages';
import Google_Login from 'modules/login/google_login';

hooks.on('page/login/before_render', ({ state })=>{
    if( get_user() ) {
        state.cancel_render = true;
        return load_page('/');
    }
})

export function render(){
    const html = create_div('#page_login')
    html.append(Google_Login());
    return html;
}