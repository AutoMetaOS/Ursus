export const AMOS = {
    root: "https://cmos.nukes.in",
    gh:{
        raw: "https://raw.githubusercontent.com/AutoMetaOS",
        ui: "https://raw.githubusercontent.com/AutoMetaOS/UI/deploy",
        cdn:"https://cdn.jsdelivr.net/gh/AutoMetaOS/UI@deploy"
    }
};

const API_KEYS = {
    urlmeta: "c3NtYW5hdkBpY2xvdWQuY29tOjBmM0NkbGhpbnlBVmNHNjRSRXh4",
    youtube: "AIzaSyDFZfyjFBWARwcMJp1aGxwV5HxXADV25H8"
}; export default API_KEYS;

export const headers = {
    std: {
        "content-type": "application/json;charset=UTF-8",
        'Access-Control-Allow-Origin': "*"
    },
    cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
    }
};

export const match = ( actual: string, expect: string ) : boolean => actual.startsWith( expect );