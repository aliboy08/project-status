import { hooks } from 'src/main/globals'
import { get_user } from 'src/lib/functions';

hooks.on_queue('ws/init', ({ ws })=>{
    const user = get_user();
    if( user ) {
        ws.set('user', { user })
    }
})