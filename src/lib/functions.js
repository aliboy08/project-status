import { get_cookie, create_div } from 'src/lib/utils';

export function get_user(){
    const user = get_cookie('user', true)
    if( typeof user !== 'object' ) return null;
    return user;
}

export function create_loading_dots(container){
    const div = create_div('loading-dots', container)
    div.innerHTML = '<i></i><i></i><i></i>';
    return div;
}

export function on_enter(input, fn){
    input.addEventListener('keydown', (e)=>{
        if( e.key !== 'Enter' ) return;
        fn(input.value)
        input.value = '';
    })
}