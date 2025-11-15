import { hooks } from 'src/main/globals';
import { get_user } from 'src/lib/functions';
import { remove_cookie } from 'src/lib/utils';
import { server_request } from 'src/main/ws';

let add_button;
let btn;

hooks.on('login', init_button)
hooks.on('logout', remove_button)
hooks.on_queue('top_nav/init', (e)=>{
    add_button = e.add_button;
    if( get_user() ) {
        init_button();
    }
});

function init_button(){
    btn = add_button({ text: 'Logout' })
    btn.onclick = logout;
    return btn;
}

function remove_button(){
    if( !btn ) return;
    btn.remove();
    btn = null;
}

function logout(){
    const user = get_user()
    server_request('logout', { user })
    hooks.do('logout', {user})
    remove_cookie('user')
}