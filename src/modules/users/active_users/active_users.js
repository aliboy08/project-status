import './active_users.css';
import { hooks } from 'src/main/globals';
import { create_div } from 'src/lib/utils';

const users = [];
let container;

hooks.add('server/message/users/update', update)
hooks.add_queue('ws/init', request_data)

export function Active_Users(){
    container = create_div('active_users', '#page_header')
    return container;
}

function request_data({ ws }){
    ws.get('users')
}

function update(data){
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