import './style.css'

import { hooks } from './main/globals';

import 'src/main/init';

import 'modules/page_header/page_header';
import 'modules/login/init';
import 'modules/users/init';

hooks.add_queue('ws/init', ()=>{
    hooks.do('init')
});