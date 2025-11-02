import { load_page } from 'src/main/pages';

export default function Link(args={}){

    const btn = document.createElement('button')
    btn.textContent = args.text;    

    if( args.path ) {
        btn.onclick = ()=>load_page(args.path)
    }
    
    return btn;
}