import { server } from './globals.js';

let timeout;
let users = [];

// server.hooks.add('connect', send_users)
// server.hooks.add('disconnect', remove_user)
server.hooks.add('set/login', login)
server.hooks.add('set/logout', logout)
server.hooks.add('set/user', set_user)
server.hooks.add('get/users', send_users)

function send_users({ ws }){
    ws.send_client({
        type: 'users/update',
        users,
    })
}

function set_user({ args, ws }){

    if( ws.user ) return;
    if( !args.user ) return;

    const user = args.user;

    const existing_user = users.find(i=>i.email===user.email);
    if( existing_user ) {
        ws.user = existing_user;
        return;
    }
    
    add_user(user, ws)
}

function login({args, ws}){

    if( !args?.user ) return;

    if( users.find(i=>i.email===args.user.email) ) {
        return;
    }

    add_user(args.user, ws)
}

function logout({ws}){
    if( !ws.user ) return;
    users.splice(users.indexOf(ws.user), 1)
    ws.user = null;
    send_users_update(ws);
}

function add_user(user, ws){
    ws.user = user;
    users.push(user)
    send_users_update(ws);
}

function send_users_update(ws){

    if( !ws ) return;

    clearTimeout(timeout)
    
    timeout = setTimeout(()=>{
        ws.send_all({
            type: 'users/update',
            users,
        })
    }, 200)
}