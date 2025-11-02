import { create_div } from 'src/lib/utils'
import { hooks, user } from 'src/main/globals'
import { ws } from 'src/main/ws';

hooks.add('page/init', init_remove)

function init_remove({ el, page }){

    if( !user ) return;

    create_div('delete', el, 'Remove').onclick = ()=>{

        ws.post('project/page/remove', {
            page_name: page.name,
            project_slug,
        })
    }

}