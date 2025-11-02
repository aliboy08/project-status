export function dispatch(name, args = null, target = document){
    const event = new Event(name)
    event.args = args;
    console.log(event)
    target.dispatchEvent(event)
}

export function get_el(el){
    if( typeof el === 'string' ) {
        return document.querySelector(el);
    }
    return el;
}

export function create_div(class_name = null, append_to = null, text = null){

    const div = document.createElement('div')
    
    if( class_name ) {
        if( class_name[0] === '#' ) {
            div.id = class_name.substring(1);
        }
        else {
            div.className = class_name;
        }
    }

    if( append_to ) get_el(append_to).append(div);
    if( text ) div.textContent = text;
    return div;
}

export function on(event_name, fn, target = document){
    target = get_el(target)
    target.addEventListener(event_name, fn)
}

export function parse_json(data){
    try {
        return JSON.parse(data)
    }
    catch(err){}
    return data;
}

export function clear_el(el){
    el = get_el(el);
    if( !el ) return;
    while(el.firstChild){
        el.removeChild(el.firstChild);
    }
}

export function set_cookie(
	cookie_name,
	cookie_value,
	expiration_hours = 3,
	path = '/'
) {

	const d = new Date();
	d.setTime(d.getTime() + expiration_hours * 60 * 60 * 1000);
	const expires = 'expires=' + d.toUTCString();

    if( typeof cookie_value === 'object' ) {
        cookie_value = JSON.stringify(cookie_value);
    }

	document.cookie =
		cookie_name + '=' + cookie_value + ';' + expires + ';path=' + path;
}

export function get_cookie(cname, parse = false) {
	const name = cname + "=";
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {

            const value = c.substring(name.length, c.length)
            
            if( parse ) {
                try {
                    return JSON.parse(value)
                } catch(e){}
            }

			return value;
		}
	}
	return "";
}

export function remove_cookie(cookie_name, path = '/') {
	document.cookie =
		cookie_name +
		'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' +
		path +
		';';
}

export function promise_resolver(){
    let resolve;
    const promise = new Promise(res=>resolve=res)
    return { promise, resolve }
}

export function to_slug(text){
    let slug = text.toLowerCase().replaceAll(' ', '-');
    return slug;
}