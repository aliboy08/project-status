export function get_page_import(name){
    return import(`./pages/${name}/index.js`);
}