import { create_div, set_cookie } from 'src/lib/utils';
import { hooks } from 'src/main/globals';
import { server_request } from 'src/main/ws';
import { load_page } from 'src/main/pages';

export default function Google_Login(){

    const html = create_div('google_login')

    html.innerHTML = `
    <div id="g_id_onload"
        data-client_id="770489628521-ruo0bl3joqagnn6747crutctqdod0dum.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="on_google_signin"
        data-nonce=""
        data-itp_support="true">
    </div>

    <div class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
    </div>`;

    load_google_signin_api();

    return html;
}

function load_google_signin_api(){
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client';
    document.body.append(script)
}

function on_google_signin(e){

    const data = decodeJwtResponse(e.credential);

    const user = {
        id: data.sub,
        full_name: data.name,
        name: data.given_name,
        last_name: data.family_name,
        image_url: data.picture,
        email: data.email,
    }
    
    set_cookie('user', user)
    server_request('login', { user })
    hooks.do('login', { user })
    load_page('/');
}

function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.on_google_signin = on_google_signin;