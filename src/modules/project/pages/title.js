import { create_div } from 'src/lib/utils'
import { hooks } from 'src/main/globals'

hooks.on('project/init_data', init)

function init({ data, container }){
    create_div('title', container, data.name)
}