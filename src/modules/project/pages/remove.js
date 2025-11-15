import { create_div } from 'src/lib/utils'
import { hooks, user } from 'src/main/globals'
import { server_request } from 'src/main/ws';

hooks.on('page/init', init_remove)

function init_remove({ el, page, project_slug }){

    if( !user ) return;

    create_div('delete', el.page_controls, 'Remove').onclick = ()=>{
        server_request('page/remove', {
            page_id: page.id,
            project_slug,
        })
    }
    
}