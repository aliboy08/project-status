import './active_users.css';
import { server_message } from 'src/main/globals';
import { create_div } from 'src/lib/utils';
import { server_request } from 'src/main/ws';

const users = [];
let container;

server_message.on('users', render_users)
server_message.on('login', (data)=>add_user(data.user))
server_message.on('logout', (data)=>remove_user(data.user))

export function Active_Users(){
    server_request('users');
    container = create_div('active_users', '#page_header')
    return container;
}

function render_users(data){
    remove_missing(data.users);
    data.users.forEach(add_user)
}

function remove_missing(new_users){
    users.forEach(user=>{
        if( new_users.find(i=>i.email===user.email) ) return;
        user.el.remove();
        users.splice(users.indexOf(user), 1);
    })
}

function add_user(user){
    
    if( !user ) return;
    if( users.find(i=>i.email===user.email) ) return;

    users.push(user)

    const el = create_div('', container)
    el.style.backgroundImage = `url(${user.image_url})`;
    el.title = user.full_name;

    user.el = el;
}

function remove_user(user){
    if( !user ) return;
    const index_to_remove = users.findIndex(i=>i.email===user.email)
    if( index_to_remove === -1 ) return;
    users[index_to_remove].el.remove();
    users.splice(index_to_remove, 1);
}