import './style.css'

import { hooks, user } from './main/globals';

import 'src/main/init';

import 'modules/page_header/page_header';
import 'modules/login/init';
import 'modules/users/init';

hooks.on_queue('ws/init', ()=>{
    hooks.do('init')
});