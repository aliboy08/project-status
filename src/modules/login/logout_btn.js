import { hooks } from 'src/main/globals';
import { get_user } from 'src/lib/functions';
import { remove_cookie } from 'src/lib/utils';

let add_button;
let btn;
let user;

hooks.add('login', init_button)
hooks.add('logout', remove_button)
hooks.add_queue('top_nav/init', (e)=>{
    add_button = e.add_button;
    user = get_user()
    if( user ) {
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
    hooks.do('logout', {user})
    remove_cookie('user')
}