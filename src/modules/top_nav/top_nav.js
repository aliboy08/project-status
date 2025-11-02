import './top_nav.css'
import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals';
import Link from 'components/link';

let container;

export function Top_Nav(){

    container = create_div('top_nav buttons_sm');
    
    add_button({ text: 'Projects', path: '/' })
    add_button({ text: 'Admin', path: '/admin' })

    hooks.do_queue('top_nav/init', {
        add_button,
    })

    return container;
}

function add_button(args={}){
    const btn = Link(args)
    container.append(btn)
    return btn;
}