import { hooks } from 'src/main/globals'
import { set_cookie } from 'src/lib/utils';
import { load_page } from 'src/main/pages';

import './login_btn';
import './logout_btn';

hooks.add('google/signin', login)
hooks.add_queue('ws/init', ws_init)

function ws_init({ ws }){
    hooks.add('logout', ({user})=>{
        ws.set('logout', {user})
    })
    hooks.add('login', ({user})=>{
        ws.set('login', {user})
    })
}

function login({ user }){
    set_cookie('user', user)
    hooks.do('login', { user })
    load_page('/');
}