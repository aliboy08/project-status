import { hooks } from 'src/main/globals'
import { get_user } from 'src/lib/functions'

let user;
let btn;
let add_button;

hooks.on('login', remove_button)
hooks.on('logout', init_button)
hooks.on_queue('top_nav/init', init)
function init(e){
    add_button = e.add_button;
    user = get_user();
    if( user ) return;
    init_button();
}

function init_button(){
    btn = add_button({ text: 'Login', path: '/login' })
}

function remove_button(){
    if( !btn ) return;
    btn.remove();
    btn = null;
}