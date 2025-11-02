import { hooks } from 'src/main/globals';
import { get_el, clear_el } from 'src/lib/utils';
import { get_page_import } from 'src/functions';

const page_body = get_el('#page_body')

hooks.add('init', load_page)

export function load_page(path = null, args = {}){

    const state = {
        cancel_render: false,
    };

    if( path ) {
        history.pushState({}, null, path);
    } else {
        path = window.location.pathname;
    }
    
    const path_args = get_path_args(path);

    const main_path = path_args[0];

    get_page_import(main_path).then(res=>{

        hooks.do(`page/${main_path}/before_render`, { state, path_args, args });

        if( state.cancel_render ) return;

        const html = render(res.render, { main_path, path_args, args });

        hooks.do(`page/${main_path}/after_render`, { html, path_args, args });
    })
}

function render(render_fn, params){

    if( !render_fn ) return;
    
    const html = render_fn(params);
    if( html ) {
        clear_el(page_body)
        page_body.append(html)
    }

    return html;
}

function get_path_args(path){

    if( path === '/' ) return ['home'];

    if( path[0] === '/' ) {
        path = path.substring(1);
    }

    return path.split('/');
}

// function get_path(){
//     let path = window.location.href.replace(window.location.origin, '');
//     if( !path ) path = '/';
//     return path;
// }

// function get_path_args(path){
//     let temp = path.split('/')
//     let main = temp[1] || '/';
//     return { main, sub: temp[2] }
// }